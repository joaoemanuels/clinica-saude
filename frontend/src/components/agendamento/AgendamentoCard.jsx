import { CalendarDays, User, Pencil, Trash2 } from "lucide-react";
import Badge from "../ui/Badge";
import Card from "../ui/Card";
import { formatarDataBR } from "../../utils/formatDate";

export default function AgendamentoCard({ agendamento, onEditar, onExcluir }) {
  return (
    <Card className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-3 min-w-0 flex-1">
        <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
          <CalendarDays className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-800 truncate">
            {formatarDataBR(agendamento.date)} · {agendamento.time.slice(0, 5)}
          </p>
          <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5 min-w-0">
            <User className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate" title={agendamento.name}>
              {agendamento.name}
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <button
          type="button"
          onClick={() => onEditar(agendamento)}
          aria-label="Editar agendamento"
          className="p-1.5 rounded-full text-slate-400 hover:text-emerald-600
                     hover:bg-emerald-50 transition-colors"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => onExcluir(agendamento)}
          aria-label="Excluir agendamento"
          className="p-1.5 rounded-full text-slate-400 hover:text-red-600
                     hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        <Badge status={agendamento.status} />
      </div>
    </Card>
  );
}
