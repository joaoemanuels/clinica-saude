import { useEffect, useState } from "react";
import { buscarDisponibilidade } from "../services/api";

export function useHorariosDisponiveis(dataISO) {
  const [disponibilidade, setDisponibilidade] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (!dataISO) {
      setDisponibilidade(null);
      return;
    }

    let cancelado = false;
    setCarregando(true);
    setErro(null);

    buscarDisponibilidade(dataISO)
      .then((dados) => {
        if (!cancelado) setDisponibilidade(dados);
      })
      .catch((e) => {
        if (!cancelado) setErro(e);
      })
      .finally(() => {
        if (!cancelado) setCarregando(false);
      });

    return () => {
      cancelado = true;
    };
  }, [dataISO]);

  return { disponibilidade, carregando, erro };
}
