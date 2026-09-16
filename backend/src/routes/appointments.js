import { Router } from "express";
import { supabase } from "../db/supabase.js";
import { calcularDisponibilidade } from "../services/availability.js";

const router = Router();

router.post("/appointments", async (req, res) => {
  const { date, time, name, phone } = req.body;

  if (!date || !time || !name || !phone) {
    return res
      .status(400)
      .json({ error: "Campos obrigatórios: date, time, name, phone." });
  }

  try {
    const disponibilidade = await calcularDisponibilidade(date);

    if (disponibilidade.blocked) {
      return res.status(422).json({
        error: "Não é possível agendar nesta data.",
        reason: disponibilidade.reason,
      });
    }

    if (!disponibilidade.available.includes(time)) {
      return res.status(409).json({ error: "Este horário já foi reservado." });
    }

    const { data, error } = await supabase
      .from("appointments")
      .insert({ date, time, name, phone, status: "confirmado" })
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json(data);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ error: "Erro ao criar agendamento." });
  }
});

router.get("/appointments", async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("date", { ascending: true })
      .order("time", { ascending: true });

    if (error) throw error;

    return res.json(data);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ error: "Erro ao listar agendamentos." });
  }
});

router.patch("/appointments/:id", async (req, res) => {
  const { id } = req.params;
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "Campos obrigatórios: name, phone." });
  }

  try {
    const { data, error } = await supabase
      .from("appointments")
      .update({ name, phone })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    if (!data)
      return res.status(404).json({ error: "Agendamento não encontrado." });

    return res.json(data);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ error: "Erro ao editar agendamento." });
  }
});

router.delete("/appointments/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase.from("appointments").delete().eq("id", id);

    if (error) throw error;

    return res.status(204).send();
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ error: "Erro ao excluir agendamento." });
  }
});

export default router;
