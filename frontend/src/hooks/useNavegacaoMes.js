import { useState } from "react";

export function useNavegacaoMes(onTrocarMes) {
  const [mesAtual, setMesAtual] = useState(new Date());

  const hoje = new Date();
  const mesMinimo = new Date(hoje.getFullYear(), hoje.getMonth(), 1);

  const podeVoltarMes =
    mesAtual.getFullYear() > mesMinimo.getFullYear() ||
    (mesAtual.getFullYear() === mesMinimo.getFullYear() &&
      mesAtual.getMonth() > mesMinimo.getMonth());

  function irParaMesAnterior() {
    if (!podeVoltarMes) return;
    setMesAtual(
      (atual) => new Date(atual.getFullYear(), atual.getMonth() - 1, 1),
    );
    onTrocarMes?.();
  }

  function irParaProximoMes() {
    setMesAtual(
      (atual) => new Date(atual.getFullYear(), atual.getMonth() + 1, 1),
    );
    onTrocarMes?.();
  }

  return { mesAtual, podeVoltarMes, irParaMesAnterior, irParaProximoMes };
}
