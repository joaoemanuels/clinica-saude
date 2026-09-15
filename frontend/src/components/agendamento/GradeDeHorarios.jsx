import Card from "../ui/Card";
import CardHorario from "./CardHorario.jsx";

const LEGENDA = [
  { status: "livre", label: "Livre" },
  { status: "ocupado", label: "Ocupado" },
  { status: "selecionado", label: "Selecionado" },
];

/**
  @param {string} dataLabel 
  @param {{ horario: string, status: "livre"|"ocupado"|"selecionado" }[]} slots
  @param {(horario: string) => void} onSelectHorario
 */
export default function GradeDeHorarios({ dataLabel, slots, onSelectHorario }) {
  return (
    <Card>
      <h2 className="font-semibold text-slate-800 mb-1">
        Horários disponíveis
      </h2>
      <p className="text-xs text-slate-500 mb-4">{dataLabel}</p>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {slots.map((slot) => (
          <CardHorario
            key={slot.horario}
            horario={slot.horario}
            status={slot.status}
            onSelect={onSelectHorario}
          />
        ))}
      </div>

      <div className="flex items-center gap-4 pt-3 border-t border-slate-100">
        {LEGENDA.map(({ status, label }) => (
          <div key={status} className="flex items-center gap-1.5">
            <span
              className={`w-2.5 h-2.5 rounded-full border ${
                status === "selecionado"
                  ? "bg-emerald-600 border-emerald-600"
                  : status === "ocupado"
                    ? "bg-slate-200 border-slate-300"
                    : "bg-white border-slate-300"
              }`}
            />
            <span className="text-xs text-slate-500">{label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
