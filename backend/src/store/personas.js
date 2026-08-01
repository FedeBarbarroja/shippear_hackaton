// Store en memoria para el hackathon. Fase 3 lo puede reemplazar por Sheets/DB si hace falta.
const personas = new Map();

export function altaPersona(persona) {
  const id = String(personas.size + 1);
  const registro = { id, ...persona };
  personas.set(id, registro);
  return registro;
}

export function listarPersonas() {
  return [...personas.values()];
}

export function getPersona(id) {
  return personas.get(id);
}
