import { Router } from "express";
import axios from "axios";
import { analizarTranscripcion } from "../services/llm.js";
import { armarMensaje, enviarWhatsapp } from "../services/whatsapp.js";
import { guardarHistorial } from "../services/sheets.js";
import { getPersona } from "../store/personas.js";
import { env } from "../config/env.js";

export const llamadasRouter = Router();

const TRANSCRIPCION_FALSA = `Agente: Hola Rosa, buen dia! Habla su vecino de todos los dias, como durmio?
Rosa: Hola! Bien, dormi bien gracias.
Agente: Que bueno. Ya desayuno?
Rosa: Si, tome unos mates con tostadas.
Agente: Y la pastilla de la presion, la tomo?
Rosa: Si, la tome despues del desayuno como siempre.
Agente: Perfecto Rosa. Como la nota hoy, algo lindo paso?
Rosa: Si, ayer me visito mi nieta, estuvimos charlando toda la tarde.
Agente: Que lindo Rosa, me alegro. Que tenga un excelente dia!`;

async function procesarLlamada({ persona, transcripcion }) {
  const analisis = await analizarTranscripcion(transcripcion, {
    nombre: persona.nombre,
    medicacion: persona.medicacion,
    intereses: persona.intereses,
  });

  const hora = new Date().toLocaleString("es-AR", { hour: "2-digit", minute: "2-digit" });
  const mensaje = armarMensaje({
    nombre: persona.nombre,
    hora,
    estado: analisis.estado,
    resumen: analisis.resumen,
  });

  await enviarWhatsapp({ numero: persona.whatsappFamilia, mensaje });

  await guardarHistorial({
    nombre: persona.nombre,
    telefono: persona.telefono,
    estado: analisis.estado,
    resumen: analisis.resumen,
    detalles: analisis.detalles,
    transcripcion,
  });

  return { analisis, mensaje };
}

// Fase 1: circuito completo con transcripcion hardcodeada, sin depender de Bland.
llamadasRouter.post("/test", async (req, res) => {
  try {
    const personaId = req.body?.personaId;
    const persona = personaId
      ? getPersona(personaId)
      : {
          nombre: "Rosa",
          telefono: "0000000000",
          whatsappFamilia: req.body?.whatsappFamilia ?? process.env.TEST_WHATSAPP_TO,
          medicacion: "presion, 1 comprimido despues del desayuno",
          intereses: "nietos, jardin",
        };

    if (!persona) return res.status(404).json({ error: "persona no encontrada" });

    const transcripcion = req.body?.transcripcion ?? TRANSCRIPCION_FALSA;
    const { analisis, mensaje } = await procesarLlamada({ persona, transcripcion });
    res.json({ ok: true, analisis, mensaje });
  } catch (err) {
    console.error(err.response?.data ?? err.message);
    res.status(500).json({ error: err.response?.data ?? err.message });
  }
});

// Fase 2: dispara la llamada real via Bland AI. Lo llama el frontend cuando
// la familia (o la demo) quiere iniciar la llamada a la persona mayor.
llamadasRouter.post("/disparar", async (req, res) => {
  try {
    const { nombre, medicacion, telefono, whatsappFamilia } = req.body;

    if (!nombre || !telefono || !whatsappFamilia) {
      return res.status(400).json({ error: "faltan campos: nombre, telefono, whatsappFamilia" });
    }

    const { data } = await axios.post(
      "https://api.bland.ai/v1/calls",
      {
        phone_number: telefono,
        pathway_id: env.bland.pathwayId,
        // Explicito: no hereda el idioma de la Persona del pathway.
        language: "es",
        request_data: { nombre, medicacion, telefono, whatsappFamilia },
        webhook: env.bland.webhookUrl,
        // Sin webhook_events: eso manda eventos *durante* la llamada (una decena
        // por llamada, sin transcripcion). Solo queremos el webhook post-llamada.
      },
      { headers: { Authorization: env.bland.apiKey } }
    );

    res.json(data);
  } catch (err) {
    console.error(err.response?.data ?? err.message);
    res.status(500).json({ error: err.response?.data ?? err.message });
  }
});

// Fase 2: webhook real de Bland AI. Bland no manda un personaId: devuelve tal cual
// el "request_data" que se le paso al disparar la llamada (POST /v1/calls).
// Por eso /disparar-llamada tiene que mandar en request_data todo lo que este
// endpoint necesita: nombre, medicacion, telefono y whatsappFamilia.
llamadasRouter.post("/webhook", async (req, res) => {
  // Responder rapido: Bland espera un 200 sin demora.
  res.status(200).json({ received: true });

  try {
    const body = req.body;
    const transcripcion = body.concatenated_transcript ?? body.transcript ?? "";
    // Bland no devuelve request_data como campo top-level: lo mezcla dentro de
    // "variables" junto con sus propias variables (timestamps, telefonos, etc).
    const datos = { ...body.variables, ...body.request_data };
    const { nombre, medicacion, telefono, whatsappFamilia, intereses } = datos;

    if (!whatsappFamilia) {
      console.error("webhook de Bland sin whatsappFamilia. keys:", Object.keys(body), Object.keys(datos));
      return;
    }

    const persona = { nombre, medicacion, telefono, whatsappFamilia, intereses };
    await procesarLlamada({ persona, transcripcion });
  } catch (err) {
    console.error("error procesando webhook de Bland", err.response?.data ?? err.message);
  }
});
