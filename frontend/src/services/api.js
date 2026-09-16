const BASE_URL = "/api";

async function tratarResposta(resposta) {
  const dados = await resposta.json().catch(() => null);

  if (!resposta.ok) {
    const mensagem = dados?.error || `Erro na requisição (${resposta.status})`;
    const erro = new Error(mensagem);
    erro.status = resposta.status;
    erro.reason = dados?.reason;
    throw erro;
  }

  return dados;
}

export async function buscarDisponibilidade(dataISO) {
  const resposta = await fetch(`${BASE_URL}/available?date=${dataISO}`);
  return tratarResposta(resposta);
}

export async function criarAgendamento({ date, time, name, phone }) {
  const resposta = await fetch(`${BASE_URL}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, time, name, phone }),
  });
  return tratarResposta(resposta);
}

export async function listarAgendamentos() {
  const resposta = await fetch(`${BASE_URL}/appointments`);
  return tratarResposta(resposta);
}
