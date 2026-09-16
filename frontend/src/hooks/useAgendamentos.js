import { useCallback, useState } from "react";
import {
  criarAgendamento,
  listarAgendamentos,
  atualizarAgendamento,
  excluirAgendamento,
} from "../services/api";

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

  const atualizar = useCallback(async (id, dados) => {
    const atualizado = await atualizarAgendamento(id, dados);
    setAgendamentos((atual) =>
      atual.map((a) => (a.id === id ? atualizado : a)),
    );
    return atualizado;
  }, []);

  const excluir = useCallback(async (id) => {
    await excluirAgendamento(id);
    setAgendamentos((atual) => atual.filter((a) => a.id !== id));
  }, []);

  return {
    agendamentos,
    carregando,
    erro,
    carregar,
    criar,
    atualizar,
    excluir,
  };
}
