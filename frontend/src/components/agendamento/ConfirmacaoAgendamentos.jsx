import { Check, User, CalendarDays, Clock, Phone, BadgeCheck } from "lucide-react";
import Card from "../ui/Card";

export default function ConfirmacaoAgendamento({
  agendamento,
  onVerAgendamentos,
  onNovoAgendamento,
}) {
  const { nome, telefone, dataLabel, horario } = agendamento;

  return (
    <Card className="max-w-sm md:max-w-md mx-auto flex flex-col items-center text-center gap-1 py-8 px-6">
      <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center mb-4">
        <Check className="w-8 h-8 text-white" strokeWidth={3} />
      </div>

      <h1 className="flex items-center gap-1.5 text-xl font-bold text-slate-800">
        Agendamento confirmado!
        <BadgeCheck className="w-5 h-5 text-emerald-600" />
      </h1>
      <p className="text-sm text-slate-500 mb-5">
        Sua consulta foi agendada com sucesso.
      </p>

      <div className="w-full rounded-xl border border-slate-100 bg-slate-50/60 p-4 text-left">
        <InfoRow icon={User} label="Nome" value={nome} />
        <InfoRow icon={CalendarDays} label="Data" value={dataLabel} />
        <InfoRow icon={Clock} label="Horário" value={horario} />
        <InfoRow icon={Phone} label="Telefone" value={telefone} last />
      </div>

      <div className="flex flex-col gap-2 w-full mt-5">
        <button
          type="button"
          onClick={onVerAgendamentos}
          className="bg-emerald-600 text-white rounded-lg px-4 py-2 font-medium
                     hover:bg-emerald-700 transition-colors"
        >
          Ver meus agendamentos
        </button>
        <button
          type="button"
          onClick={onNovoAgendamento}
          className="rounded-lg px-4 py-2 font-medium text-emerald-600 border
                     border-emerald-200 hover:bg-emerald-50 transition-colors"
        >
          Novo agendamento
        </button>
      </div>

      <p className="text-xs text-slate-400 mt-5">
        Em caso de imprevistos, entre em contato conosco.
      </p>
    </Card>
  );
}

function InfoRow({ icon: Icon, label, value, last = false }) {
  return (
    <div
      className={`flex items-center gap-3 py-2.5 ${
        last ? "" : "border-b border-slate-200/70"
      }`}
    >
      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-emerald-600" />
      </div>
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm font-medium text-slate-700">{value}</p>
      </div>
    </div>
  );
}