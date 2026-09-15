export default function CardHorario({ horario, status, onSelect }) {
  const isOcupado = status === "ocupado";
  const isSelecionado = status === "selecionado";

  const baseClasses =
    "w-full py-2.5 rounded-lg text-sm font-medium border transition-colors";

  const statusClasses = isSelecionado
    ? "bg-emerald-600 border-emerald-600 text-white"
    : isOcupado
      ? "bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed"
      : "bg-white border-slate-200 text-slate-700 hover:border-emerald-400";

  return (
    <button
      type="button"
      disabled={isOcupado}
      onClick={() => onSelect(horario)}
      className={`${baseClasses} ${statusClasses}`}
    >
      {horario}
    </button>
  );
}
