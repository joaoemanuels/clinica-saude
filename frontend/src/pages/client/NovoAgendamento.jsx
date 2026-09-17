import { useMemo, useState } from "react";
import Calendario from "../../components/agendamento/Calendario";
import GradeHorarios from "../../components/agendamento/GradeHorarios";
import ModalDadosPaciente from "../../components/agendamento/ModalDadosPacientes";
import ConfirmacaoAgendamento from "../../components/agendamento/ConfirmacaoAgendamentos";
import { useHorariosDisponiveis } from "../../hooks/useHorariosDisponiveis";
import { useAgendamentos } from "../../hooks/useAgendamentos";
import { useNavigate } from "react-router-dom";
import { useFeriados } from "../../hooks/useFeriados";

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

function formatarDataISO(ano, mes, dia) {
  const mesStr = String(mes + 1).padStart(2, "0");
  const diaStr = String(dia).padStart(2, "0");
  return `${ano}-${mesStr}-${diaStr}`;
}

export default function NovoAgendamento() {
  const [mesAtual, setMesAtual] = useState(new Date());
  const [diaSelecionado, setDiaSelecionado] = useState(new Date().getDate());
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [agendamentoConfirmado, setAgendamentoConfirmado] = useState(null);
  const [erroConfirmacao, setErroConfirmacao] = useState(null);
  const feriados = useFeriados(mesAtual.getFullYear(), mesAtual.getMonth());

  const dataISO = diaSelecionado
    ? formatarDataISO(
        mesAtual.getFullYear(),
        mesAtual.getMonth(),
        diaSelecionado,
      )
    : null;

  const { disponibilidade, carregando, erro } = useHorariosDisponiveis(dataISO);
  const { criar } = useAgendamentos();
  const navigate = useNavigate();
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

  const slots = useMemo(() => {
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

  function handleSelectDia(dia) {
    setDiaSelecionado(dia);
    setHorarioSelecionado(null);
  }

  function handleSelectHorario(horario) {
    setHorarioSelecionado(horario);
  }

  const hoje = new Date();
  const mesMinimo = new Date(hoje.getFullYear(), hoje.getMonth(), 1);

  const podeVoltarMes =
    mesAtual.getFullYear() > mesMinimo.getFullYear() ||
    (mesAtual.getFullYear() === mesMinimo.getFullYear() &&
      mesAtual.getMonth() > mesMinimo.getMonth());

  function handleMesAnterior() {
    if (!podeVoltarMes) return;
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

  async function handleConfirmarDados({ nome, telefone }) {
    setErroConfirmacao(null);
    try {
      await criar({
        date: dataISO,
        time: horarioSelecionado,
        name: nome,
        phone: telefone,
      });
      setAgendamentoConfirmado({
        nome,
        telefone,
        dataLabel,
        horario: horarioSelecionado,
      });
      setModalAberto(false);
    } catch (e) {
      setErroConfirmacao(e.message);
    }
  }

  function handleNovoAgendamento() {
    setAgendamentoConfirmado(null);
    setHorarioSelecionado(null);
  }

  if (agendamentoConfirmado) {
    return (
      <ConfirmacaoAgendamento
        agendamento={agendamentoConfirmado}
        onNovoAgendamento={handleNovoAgendamento}
        onVerAgendamentos={() => navigate("/meus-agendamentos")}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold text-slate-800">Agende sua consulta</h1>

      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:items-start md:gap-6 ">
        <Calendario
          mesAtual={mesAtual}
          diaSelecionado={diaSelecionado}
          onSelectDia={handleSelectDia}
          onMesAnterior={handleMesAnterior}
          onMesProximo={handleMesProximo}
          podeVoltarMes={podeVoltarMes}
          feriados={feriados}
        />

        {!diaSelecionado && (
          <div className="text-center text-sm text-slate-400 py-10">
            Escolha uma data para ver os horários disponíveis.
          </div>
        )}

        {diaSelecionado && carregando && (
          <div className="text-center text-sm text-slate-400 py-10">
            Carregando horários...
          </div>
        )}

        {diaSelecionado && !carregando && erro && (
          <div className="text-center text-sm text-red-500 py-10">
            Não foi possível carregar os horários. Tente novamente.
          </div>
        )}

        {diaSelecionado && !carregando && disponibilidade?.blocked && (
          <div className="text-center text-sm text-slate-500 py-10">
            {disponibilidade.reason === "holiday"
              ? "Sem atendimento neste dia — feriado."
              : "Sem atendimento aos finais de semana."}
          </div>
        )}

        {diaSelecionado &&
          !carregando &&
          disponibilidade &&
          !disponibilidade.blocked && (
            <GradeHorarios
              dataLabel={dataLabel}
              slots={slots}
              onSelectHorario={handleSelectHorario}
            />
          )}
        {horarioSelecionado && (
          <button
            type="button"
            onClick={() => setModalAberto(true)}
            className="w-full md:w-auto md:self-end bg-emerald-600 text-white
                     rounded-lg px-4 py-2 font-medium hover:bg-emerald-700
                     transition-colors"
          >
            Confirmar agendamento
          </button>
        )}
      </div>

      {erroConfirmacao && (
        <p className="text-sm text-red-500 text-center">{erroConfirmacao}</p>
      )}
      <ModalDadosPaciente
        open={modalAberto}
        onClose={() => setModalAberto(false)}
        onConfirmar={handleConfirmarDados}
      />
    </div>
  );
}
