import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { env } from "../config/env.js";

let docPromise;

function getDoc() {
  if (!docPromise) {
    const auth = new JWT({
      email: env.sheets.serviceAccountEmail,
      key: env.sheets.privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const doc = new GoogleSpreadsheet(env.sheets.sheetId, auth);
    docPromise = doc.loadInfo().then(() => doc);
  }
  return docPromise;
}

export async function guardarHistorial({ nombre, telefono, estado, resumen, detalles, transcripcion }) {
  const doc = await getDoc();
  const sheet = doc.sheetsByIndex[0];

  await sheet.addRow({
    fecha: new Date().toISOString(),
    nombre,
    telefono,
    estado,
    resumen,
    detalles: JSON.stringify(detalles ?? {}),
    transcripcion,
  });
}
