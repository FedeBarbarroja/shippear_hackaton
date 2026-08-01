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

// Evolution arma el JID con lo que le mandes: "+54 341 555 0199" termina en un
// numero que no existe en WhatsApp y el mensaje se pierde sin error.
// ponytail: solo contempla AR (+54 9). Si suman otro pais, usar libphonenumber-js.
export function normalizarNumero(numero) {
  let n = String(numero ?? "").replace(/\D/g, "");
  if (n.startsWith("0")) n = n.slice(1);          // 0341... -> 341...
  if (!n.startsWith("54")) n = "54" + n;          // 341... -> 54341...
  if (n[2] !== "9") n = "549" + n.slice(2);       // 54341... -> 549341...
  return n;
}

export async function enviarWhatsapp({ numero, mensaje }) {
  const url = `${env.evolution.url}/message/sendText/${env.evolution.instance}`;

  await axios.post(
    url,
    { number: normalizarNumero(numero), text: mensaje },
    { headers: { apikey: env.evolution.apiKey } }
  );
}
