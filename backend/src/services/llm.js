import axios from "axios";
import { env } from "../config/env.js";

const ESTADOS = ["todo_bien", "alerta", "emergencia"];

const SYSTEM_PROMPT = `Sos un analista clinico-social que revisa la transcripcion de una llamada diaria a una persona mayor que vive sola.
Tu trabajo es devolver SOLO un JSON (sin texto extra) con esta forma exacta:

{
  "estado": "todo_bien" | "alerta" | "emergencia",
  "resumen": "una frase corta y concreta para la familia",
  "detalles": {
    "atendio": true | false,
    "comio": true | false | null,
    "tomo_medicacion": true | false | null,
    "animo": "bueno" | "decaido" | "confuso" | null,
    "hechos_relevantes": ["string", "..."]
  }
}

Criterios:
- "emergencia": mencion de caida, dolor fuerte, confusion marcada, dificultad para respirar, o pidio ayuda explicitamente.
- "alerta": no comio, se olvido la medicacion, suena decaida, malestar leve, o no atendio la llamada.
- "todo_bien": atendio, coherente, comio, tomo la medicacion, animo normal.
Ante la duda entre dos estados, elegi el mas grave.
Si no atendio la llamada (transcripcion vacia o de contestador), "atendio": false y "estado": "alerta".`;

export async function analizarTranscripcion(transcripcion, contexto = {}) {
  const userPrompt = `Datos de la persona: ${JSON.stringify(contexto)}

Transcripcion de la llamada:
"""
${transcripcion}
"""`;

  const { data } = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: env.groq.model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    },
    {
      headers: {
        Authorization: `Bearer ${env.groq.apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  const raw = data.choices[0].message.content;
  const parsed = JSON.parse(raw);

  if (!ESTADOS.includes(parsed.estado)) {
    throw new Error(`Estado invalido devuelto por el LLM: ${parsed.estado}`);
  }

  return parsed;
}
