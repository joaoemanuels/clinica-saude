import { useMemo, useState } from "react";
import Calendario from "../../components/agendamento/Calendario";
import GradeDeHorarios from "../../components/agendamento/GradeDeHorarios";

const DIAS_SEMANA_EXTENSO = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
];
const MESES_EXTENSO = [
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

const HORARIOS_MOCK = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];
const OCUPADOS_MOCK = ["11:00", "18:00"];

export default function NovoAgendamento() {
  const [mesAtual, setMesAtual] = useState(new Date(2026, 1, 1));
  const [diaSelecionado, setDiaSelecionado] = useState(10);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);

  const dataLabel = useMemo(() => {
    if (!diaSelecionado) return "";
    const data = new Date(
      mesAtual.getFullYear(),
      mesAtual.getMonth(),
      diaSelecionado,
    );
    const diaSemana = DIAS_SEMANA_EXTENSO[data.getDay()];
    return `${diaSelecionado} de ${MESES_EXTENSO[mesAtual.getMonth()]} de ${mesAtual.getFullYear()} (${diaSemana})`;
  }, [mesAtual, diaSelecionado]);

  const slots = useMemo(
    () =>
      HORARIOS_MOCK.map((horario) => ({
        horario,
        status:
          horario === horarioSelecionado
            ? "selecionado"
            : OCUPADOS_MOCK.includes(horario)
              ? "ocupado"
              : "livre",
      })),
    [horarioSelecionado],
  );

  function handleSelectDia(dia) {
    setDiaSelecionado(dia);
    setHorarioSelecionado(null);
  }

  function handleSelectHorario(horario) {
    setHorarioSelecionado(horario);
  }

  function handleMesAnterior() {
    setMesAtual(
      (atual) => new Date(atual.getFullYear(), atual.getMonth() - 1, 1),
    );
    setDiaSelecionado(null);
  }

  function handleMesProximo() {
    setMesAtual(
      (atual) => new Date(atual.getFullYear(), atual.getMonth() + 1, 1),
    );
    setDiaSelecionado(null);
  }

  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:items-start md:gap-6">
      <h1 className="text-xl font-bold text-slate-800 md:col-span-2">
        Agende sua consulta
      </h1>

      <Calendario
        mesAtual={mesAtual}
        diaSelecionado={diaSelecionado}
        onSelectDia={handleSelectDia}
        onMesAnterior={handleMesAnterior}
        onMesProximo={handleMesProximo}
      />

      {diaSelecionado ? (
        <GradeDeHorarios
          dataLabel={dataLabel}
          slots={slots}
          onSelectHorario={handleSelectHorario}
        />
      ) : (
        <div className="text-center text-sm text-slate-400 py-10">
          Escolha uma data para ver os horários disponíveis.
        </div>
      )}
    </div>
  );
}
