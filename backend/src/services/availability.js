import { supabase } from "../db/supabase.js";
import { ehFeriado } from "./holidays.js";

const HORA_INICIO = 8;
const HORA_FIM = 18;

export function gerarHorariosDoDia() {
  const horarios = [];
  for (let h = HORA_INICIO; h <= HORA_FIM; h++) {
    horarios.push(`${String(h).padStart(2, "0")}:00`);
  }
  return horarios;
}

export function ehFimDeSemana(dataISO) {
  const [ano, mes, dia] = dataISO.split("-").map(Number);
  const diaSemana = new Date(ano, mes - 1, dia).getDay();
  return diaSemana === 0 || diaSemana === 6;
}

export async function buscarHorariosOcupados(dataISO) {
  const { data, error } = await supabase
    .from("appointments")
    .select("time")
    .eq("date", dataISO)
    .neq("status", "cancelado");

  if (error) throw error;

  return data.map((linha) => linha.time.slice(0, 5)); // "08:00:00" -> "08:00"
}

export async function calcularDisponibilidade(dataISO) {
  if (ehFimDeSemana(dataISO)) {
    return { available: [], blocked: true, reason: "weekend" };
  }

  if (await ehFeriado(dataISO)) {
    return { available: [], blocked: true, reason: "holiday" };
  }

  const ocupados = await buscarHorariosOcupados(dataISO);
  const todosHorarios = gerarHorariosDoDia();
  const disponiveis = todosHorarios.filter((h) => !ocupados.includes(h));

  return { available: disponiveis, occupied: ocupados, blocked: false };
}
