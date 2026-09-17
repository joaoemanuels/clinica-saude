import { Moon } from "lucide-react";
import { DIAS_SEMANA, getDiasDoMes } from "../../utils/formatDate";

export default function CalendarioDias({
  mesAtual,
  diaSelecionado,
  onSelectDia,

  feriados = [],
}) {
  const ano = mesAtual.getFullYear();
  const mes = mesAtual.getMonth();
  const dias = getDiasDoMes(ano, mes);
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  return (
    <div className="grid grid-cols-7 gap-y-2 text-center">
      {DIAS_SEMANA.map((dia) => (
        <span key={dia} className="text-xs text-slate-400 font-medium">
          {dia}
        </span>
      ))}

      {dias.map((dia, idx) => {
        if (!dia) return <span key={`vazio-${idx}`} />;

        const isSelecionado = dia === diaSelecionado;
        const dataDoDay = new Date(ano, mes, dia);
        const passado = dataDoDay < hoje;
        const isFeriado = feriados.includes(dia);

        return (
          <button
            key={dia}
            type="button"
            onClick={() => onSelectDia(dia)}
            disabled={passado}
            className={`relative w-8 h-8 mx-auto flex items-center justify-center rounded-full text-sm transition-colors ${
              isSelecionado
                ? "bg-emerald-600 text-white font-semibold"
                : passado
                  ? "text-slate-300 cursor-not-allowed"
                  : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {dia}
            {isFeriado && !isSelecionado && (
              <Moon
                className="absolute -top-1 -right-1 w-3 h-3 text-emerald-500 fill-emerald-500"
                strokeWidth={1.5}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
