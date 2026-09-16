import { useCallback, useState } from "react";
import { criarAgendamento, listarAgendamentos } from "../services/api";

export function useAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const dados = await listarAgendamentos();
      setAgendamentos(dados);
    } catch (e) {
      setErro(e);
    } finally {
      setCarregando(false);
    }
  }, []);

  const criar = useCallback(async (dadosAgendamento) => {
    return criarAgendamento(dadosAgendamento);
  }, []);

  return { agendamentos, carregando, erro, carregar, criar };
}
