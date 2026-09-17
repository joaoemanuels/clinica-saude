import GradeHorarios from "./GradeHorarios";

export default function PainelHorarios({
  diaSelecionado,
  carregando,
  erro,
  disponibilidade,
  dataLabel,
  slots,
  onSelectHorario,
}) {
  if (!diaSelecionado) {
    return (
      <div className="text-center text-sm text-slate-400 py-10">
        Escolha uma data para ver os horários disponíveis.
      </div>
    );
  }

  if (carregando) {
    return (
      <div className="text-center text-sm text-slate-400 py-10">
        Carregando horários...
      </div>
    );
  }

  if (erro) {
    return (
      <div className="text-center text-sm text-red-500 py-10">
        Não foi possível carregar os horários. Tente novamente.
      </div>
    );
  }

  if (disponibilidade?.blocked) {
    return (
      <div className="text-center text-sm text-slate-500 py-10">
        {disponibilidade.reason === "holiday"
          ? "Sem atendimento neste dia — feriado."
          : "Sem atendimento aos finais de semana."}
      </div>
    );
  }

  return (
    <GradeHorarios
      dataLabel={dataLabel}
      slots={slots}
      onSelectHorario={onSelectHorario}
    />
  );
}
