import { ChevronLeft, ChevronRight, X, Clock, Moon } from "lucide-react";
import Card from "../ui/Card";

const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MESES = [
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

function getDiasDoMes(ano, mes) {
  const primeiroDia = new Date(ano, mes, 1).getDay();
  const totalDias = new Date(ano, mes + 1, 0).getDate();

  const dias = [];
  for (let i = 0; i < primeiroDia; i++) dias.push(null);
  for (let d = 1; d <= totalDias; d++) dias.push(d);
  return dias;
}

export default function Calendario({
  mesAtual,
  diaSelecionado,
  onSelectDia,
  onMesAnterior,
  onMesProximo,
  onFechar,
  podeVoltarMes,
  feriados = [],
}) {
  const ano = mesAtual.getFullYear();
  const mes = mesAtual.getMonth();
  const dias = getDiasDoMes(ano, mes);
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-slate-800">Escolha uma data</h2>
        {onFechar && (
          <button
            type="button"
            onClick={onFechar}
            aria-label="Fechar calendário"
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={onMesAnterior}
          disabled={!podeVoltarMes}
          className="... disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Mês anterior"
        >
          <ChevronLeft className="w-4 h-4 text-slate-500" />
        </button>
        <span className="text-sm font-medium text-slate-700">
          {MESES[mes]} {ano}
        </span>
        <button type="button" onClick={onMesProximo} aria-label="Próximo mês">
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </button>
      </div>

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

      <div className="flex items-start gap-2 mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
        <Clock className="w-4 h-4 shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-slate-600">Horário de funcionamento</p>
          <p>08:00 às 18:00 (segunda a sexta)</p>
          <p>Consultas de 1 hora</p>
        </div>
      </div>
    </Card>
  );
}
