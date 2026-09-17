import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { MESES_EXTENSO } from "../../utils/formatDate";

import Card from "../ui/Card";
import CalendarioDias from "./CalendarioDias";

export default function Calendario({
  mesAtual,
  diaSelecionado,
  onSelectDia,
  onMesAnterior,
  onMesProximo,
  podeVoltarMes,
  feriados = [],
}) {
  const ano = mesAtual.getFullYear();
  const mes = mesAtual.getMonth();
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-slate-800">Escolha uma data</h2>
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
          {MESES_EXTENSO[mes]} {ano}
        </span>
        <button type="button" onClick={onMesProximo} aria-label="Próximo mês">
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </button>
      </div>

      <CalendarioDias
        mesAtual={mesAtual}
        diaSelecionado={diaSelecionado}
        onSelectDia={onSelectDia}
        feriados={feriados}
      />

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
