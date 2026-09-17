import { useMemo } from "react";

export function useSlotsHorario({
  disponibilidade,
  horarioSelecionado,
  diaSelecionado,
  mesAtual,
}) {
  return useMemo(() => {
    if (!disponibilidade || disponibilidade.blocked) return [];

    const ocupados = disponibilidade.occupied || [];
    const agora = new Date();
    const ehHoje =
      diaSelecionado === agora.getDate() &&
      mesAtual.getMonth() === agora.getMonth() &&
      mesAtual.getFullYear() === agora.getFullYear();

    function ehHorarioPassado(horario) {
      if (!ehHoje) return false;
      const [h, m] = horario.split(":").map(Number);
      const horarioData = new Date(
        agora.getFullYear(),
        agora.getMonth(),
        agora.getDate(),
        h,
        m,
      );
      return horarioData < agora;
    }

    return [...disponibilidade.available, ...ocupados].sort().map((horario) => {
      const passado = ehHorarioPassado(horario);
      return {
        horario,
        status:
          horario === horarioSelecionado
            ? "selecionado"
            : passado
              ? "passado"
              : ocupados.includes(horario)
                ? "ocupado"
                : "livre",
      };
    });
  }, [disponibilidade, horarioSelecionado, diaSelecionado, mesAtual]);
}
