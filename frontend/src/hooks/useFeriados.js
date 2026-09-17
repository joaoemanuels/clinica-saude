// hooks/useFeriados.js
import { useEffect, useState } from "react";

export function useFeriados(ano, mes) {
  const [feriados, setFeriados] = useState([]);

  useEffect(() => {
    let cancelado = false;

    async function buscar() {
      try {
        const res = await fetch(
          `https://date.nager.at/api/v3/PublicHolidays/${ano}/BR`,
        );
        if (!res.ok) throw new Error("Falha ao buscar feriados");
        const data = await res.json();

        const diasDoMes = data
          .filter((f) => {
            const [, m] = f.date.split("-").map(Number);
            return m - 1 === mes;
          })
          .map((f) => Number(f.date.split("-")[2]));

        if (!cancelado) setFeriados(diasDoMes);
      } catch {
        if (!cancelado) setFeriados([]);
      }
    }

    buscar();
    return () => {
      cancelado = true;
    };
  }, [ano, mes]);

  return feriados;
}
