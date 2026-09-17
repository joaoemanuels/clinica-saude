const DIAS_SEMANA_EXTENSO = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
];

export const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export const MESES_EXTENSO = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export function formatarDataISO(ano, mes, dia) {
  const mesStr = String(mes + 1).padStart(2, "0");
  const diaStr = String(dia).padStart(2, "0");
  return `${ano}-${mesStr}-${diaStr}`;
}

export function formatarDataBR(dataISO) {
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

export function getDiasDoMes(ano, mes) {
  const primeiroDia = new Date(ano, mes, 1).getDay();
  const totalDias = new Date(ano, mes + 1, 0).getDate();

  const dias = [];
  for (let i = 0; i < primeiroDia; i++) dias.push(null);
  for (let d = 1; d <= totalDias; d++) dias.push(d);
  return dias;
}

export function formatarDataLabel(mesAtual, diaSelecionado) {
  if (!diaSelecionado) return "";
  const data = new Date(
    mesAtual.getFullYear(),
    mesAtual.getMonth(),
    diaSelecionado,
  );
  const diaSemana = DIAS_SEMANA_EXTENSO[data.getDay()];
  return `${diaSelecionado} de ${MESES_EXTENSO[mesAtual.getMonth()]} de ${mesAtual.getFullYear()} (${diaSemana})`;
}

export function getDiasDoMes(ano, mes) {
  const primeiroDia = new Date(ano, mes, 1).getDay();
  const totalDias = new Date(ano, mes + 1, 0).getDate();

  const dias = [];
  for (let i = 0; i < primeiroDia; i++) dias.push(null);
  for (let d = 1; d <= totalDias; d++) dias.push(d);
  return dias;
}

export function formatarDataLabel(mesAtual, diaSelecionado) {
  if (!diaSelecionado) return "";
  const data = new Date(
    mesAtual.getFullYear(),
    mesAtual.getMonth(),
    diaSelecionado,
  );
  const diaSemana = DIAS_SEMANA_EXTENSO[data.getDay()];
  return `${diaSelecionado} de ${MESES_EXTENSO[mesAtual.getMonth()]} de ${mesAtual.getFullYear()} (${diaSemana})`;
}
