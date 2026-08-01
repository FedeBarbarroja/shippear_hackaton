import express from "express";
import { env } from "./config/env.js";
import { personasRouter } from "./routes/personas.js";
import { llamadasRouter } from "./routes/llamadas.js";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/personas", personasRouter);
app.use("/llamadas", llamadasRouter);

app.listen(env.port, () => {
  console.log(`Buendia backend escuchando en :${env.port}`);
});
