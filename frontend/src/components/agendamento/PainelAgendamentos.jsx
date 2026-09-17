import EmptyState from "../ui/EmptyState";
import AgendamentoCard from "./AgendamentoCard";

export default function PainelAgendamentos({
  carregando,
  erro,
  agendamentos,
  onEditar,
  onExcluir,
  onAgendarNovo,
}) {
  if (carregando) {
    return (
      <p className="text-center text-sm text-slate-400 py-10">
        Carregando agendamentos...
      </p>
    );
  }

  if (erro) {
    return (
      <p className="text-center text-sm text-red-500 py-10">
        Não foi possível carregar seus agendamentos.
      </p>
    );
  }

  if (agendamentos.length === 0) {
    return (
      <EmptyState
        title="Nenhum agendamento encontrado"
        description="Você ainda não possui agendamentos. Agende sua primeira consulta!"
        actionLabel="Agendar consulta"
        onAction={onAgendarNovo}
      />
    );
  }

  return (
    <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-4">
      {agendamentos.map((agendamento) => (
        <AgendamentoCard
          key={agendamento.id}
          agendamento={agendamento}
          onEditar={onEditar}
          onExcluir={onExcluir}
        />
      ))}
    </div>
  );
}
