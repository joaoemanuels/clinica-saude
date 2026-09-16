import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, User } from "lucide-react";
import { useAgendamentos } from "../../hooks/useAgendamentos";
import EmptyState from "../../components/ui/EmptyState";
import Badge from "../../components/ui/Badge";
import Card from "../../components/ui/Card";
import { formatarDataBR } from "../../utils/formatDate";

export default function MeusAgendamentos() {
  const { agendamentos, carregando, erro, carregar } = useAgendamentos();
  const navigate = useNavigate();

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

      {carregando && (
        <p className="text-center text-sm text-slate-400 py-10">
          Carregando agendamentos...
        </p>
      )}

      {!carregando && erro && (
        <p className="text-center text-sm text-red-500 py-10">
          Não foi possível carregar seus agendamentos.
        </p>
      )}

      {!carregando && !erro && agendamentos.length === 0 && (
        <EmptyState
          title="Nenhum agendamento encontrado"
          description="Você ainda não possui agendamentos. Agende sua primeira consulta!"
          actionLabel="Agendar consulta"
          onAction={() => navigate("/")}
        />
      )}

      {!carregando && !erro && agendamentos.length > 0 && (
        <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-4">
          {agendamentos.map((agendamento) => (
            <Card
              key={agendamento.id}
              className="flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <CalendarDays className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {formatarDataBR(agendamento.date)} ·{" "}
                    {agendamento.time.slice(0, 5)}
                  </p>
                  <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                    {agendamento.name}
                  </p>
                </div>
              </div>

              <Badge status={agendamento.status} />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
