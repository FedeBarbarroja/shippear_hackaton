// node src/services/whatsapp.test.js
import assert from "node:assert/strict";
import { normalizarNumero } from "./whatsapp.js";

const casos = {
  "+54 341 555 0199": "5493415550199",
  "5493415550199": "5493415550199",
  "543415550199": "5493415550199",
  "03415550199": "5493415550199",
  "3415550199": "5493415550199",
  "+54 9 341 555-0199": "5493415550199",
};

for (const [entrada, esperado] of Object.entries(casos)) {
  assert.equal(normalizarNumero(entrada), esperado, `fallo con "${entrada}"`);
}
console.log("ok");
