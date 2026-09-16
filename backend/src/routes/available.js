import { Router } from "express";
import { calcularDisponibilidade } from "../services/availability.js";

const router = Router();

const REGEX_DATA_ISO = /^\d{4}-\d{2}-\d{2}$/;

router.get("/available", async (req, res) => {
  const { date } = req.query;

  if (!date || !REGEX_DATA_ISO.test(date)) {
    return res.status(400).json({ error: "Parâmetro 'date' inválido. Use YYYY-MM-DD." });
  }

  try {
    const resultado = await calcularDisponibilidade(date);
    return res.json({ date, ...resultado });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ error: "Erro ao consultar disponibilidade." });
  }
});

export default router;