import axios from "axios";
import { env } from "../config/env.js";

const EMOJI_ESTADO = {
  todo_bien: "🟢",
  alerta: "🟡",
  emergencia: "🔴",
};

export function armarMensaje({ nombre, hora, estado, resumen }) {
  const emoji = EMOJI_ESTADO[estado] ?? "⚪";
  const titulo = { todo_bien: "Todo bien", alerta: "Atención", emergencia: "Emergencia" }[estado];
  return `${emoji} *Buendía — ${nombre}, ${hora}*\n${titulo}. ${resumen}`;
}

export async function enviarWhatsapp({ numero, mensaje }) {
  const url = `${env.evolution.url}/message/sendText/${env.evolution.instance}`;

  await axios.post(
    url,
    { number: numero, text: mensaje },
    { headers: { apikey: env.evolution.apiKey } }
  );
}
