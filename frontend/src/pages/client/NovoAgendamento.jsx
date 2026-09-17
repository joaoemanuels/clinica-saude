import { useState } from "react";

import { useHorariosDisponiveis } from "../../hooks/useHorariosDisponiveis";
import { useAgendamentos } from "../../hooks/useAgendamentos";
import { useFeriados } from "../../hooks/useFeriados";
import { useNavegacaoMes } from "../../hooks/useNavegacaoMes";
import { useSlotsHorario } from "../../hooks/useSlotsHorario";
import { useNavigate } from "react-router-dom";
import { formatarDataISO, formatarDataLabel } from "../../utils/formatDate";

import Calendario from "../../components/agendamento/Calendario";
import PainelHorarios from "../../components/agendamento/PainelHorarios";
import ConfirmacaoAgendamento from "../../components/agendamento/modais/ModalConfirmarAgendamento";
import ModalDadosPacientes from "../../components/agendamento/modais/ModalDadosPacientes";

export default function NovoAgendamento() {
  const [diaSelecionado, setDiaSelecionado] = useState(new Date().getDate());
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [agendamentoConfirmado, setAgendamentoConfirmado] = useState(null);
  const [erroConfirmacao, setErroConfirmacao] = useState(null);

  const { mesAtual, podeVoltarMes, irParaMesAnterior, irParaProximoMes } =
    useNavegacaoMes(() => setDiaSelecionado(null));

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

  const dataLabel = formatarDataLabel(mesAtual, diaSelecionado);

  const slots = useSlotsHorario({
    disponibilidade,
    horarioSelecionado,
    diaSelecionado,
    mesAtual,
  });

  function handleSelectDia(dia) {
    setDiaSelecionado(dia);
    setHorarioSelecionado(null);
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

      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:items-start md:gap-6">
        <Calendario
          mesAtual={mesAtual}
          diaSelecionado={diaSelecionado}
          onSelectDia={handleSelectDia}
          onMesAnterior={irParaMesAnterior}
          onMesProximo={irParaProximoMes}
          podeVoltarMes={podeVoltarMes}
          feriados={feriados}
        />

        <PainelHorarios
          diaSelecionado={diaSelecionado}
          carregando={carregando}
          erro={erro}
          disponibilidade={disponibilidade}
          dataLabel={dataLabel}
          slots={slots}
          onSelectHorario={setHorarioSelecionado}
        />

        {horarioSelecionado && (
          <button
            type="button"
            onClick={() => setModalAberto(true)}
            className="w-full md:col-span-2 md:w-auto md:self-end bg-emerald-600 text-white
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

      <ModalDadosPacientes
        open={modalAberto}
        onClose={() => setModalAberto(false)}
        onConfirmar={handleConfirmarDados}
      />
    </div>
  );
}
