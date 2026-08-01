import { Router } from "express";
import { altaPersona, listarPersonas, getPersona } from "../store/personas.js";

export const personasRouter = Router();

// Formulario de alta (lo consume el front)
personasRouter.post("/", (req, res) => {
  const { nombre, telefono, horario, whatsappFamilia, medicacion, intereses } = req.body;

  if (!nombre || !telefono || !whatsappFamilia) {
    return res.status(400).json({ error: "faltan campos: nombre, telefono, whatsappFamilia" });
  }

  const persona = altaPersona({ nombre, telefono, horario, whatsappFamilia, medicacion, intereses });
  res.status(201).json(persona);
});

personasRouter.get("/", (req, res) => {
  res.json(listarPersonas());
});

personasRouter.get("/:id", (req, res) => {
  const persona = getPersona(req.params.id);
  if (!persona) return res.status(404).json({ error: "no encontrada" });
  res.json(persona);
});
