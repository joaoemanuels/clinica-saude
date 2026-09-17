const cachePorAno = new Map();

async function buscarFeriadosDoAno(ano) {
  if (cachePorAno.has(ano)) {
    return cachePorAno.get(ano);
  }

  const url = `https://date.nager.at/api/v3/PublicHolidays/${ano}/BR`;
  const resposta = await fetch(url);

  if (!resposta.ok) {
    throw new Error(`Falha ao consultar feriados de ${ano}: ${resposta.status}`);
  }

  const feriados = await resposta.json();
  const datas = new Set(feriados.map((f) => f.date));

  cachePorAno.set(ano, datas);
  return datas;
}

export async function ehFeriado(dataISO) {
  const ano = dataISO.slice(0, 4);
  const feriadosDoAno = await buscarFeriadosDoAno(Number(ano));
  return feriadosDoAno.has(dataISO);
}