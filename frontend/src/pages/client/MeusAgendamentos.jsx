import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAgendamentos } from "../../hooks/useAgendamentos";

import PainelAgendamentos from "../../components/agendamento/PainelAgendamentos";
import ModalEditarAgendamento from "../../components/agendamento/modais/ModalEditarAgendamento";
import ModalConfirmarExclusao from "../../components/agendamento/modais/ModalConfirmarExclusao";

export default function MeusAgendamentos() {
  const { agendamentos, carregando, erro, carregar, atualizar, excluir } =
    useAgendamentos();
  const navigate = useNavigate();

  const [agendamentoEditando, setAgendamentoEditando] = useState(null);
  const [agendamentoExcluindo, setAgendamentoExcluindo] = useState(null);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Meus Agendamentos</h1>
        <p className="text-sm text-slate-500">
          Confira seus próximos agendamentos e o status de cada um.
        </p>
      </div>

      <PainelAgendamentos
        carregando={carregando}
        erro={erro}
        agendamentos={agendamentos}
        onEditar={setAgendamentoEditando}
        onExcluir={setAgendamentoExcluindo}
        onAgendarNovo={() => navigate("/")}
      />

      <ModalEditarAgendamento
        open={!!agendamentoEditando}
        agendamento={agendamentoEditando}
        onClose={() => setAgendamentoEditando(null)}
        onSalvar={atualizar}
      />

      <ModalConfirmarExclusao
        open={!!agendamentoExcluindo}
        onClose={() => setAgendamentoExcluindo(null)}
        onConfirmar={() => excluir(agendamentoExcluindo.id)}
      />
    </div>
  );
}
