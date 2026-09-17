export function formatarTelefone(valor) {
  const digitos = valor.replace(/\D/g, "").slice(0, 11);

  if (digitos.length <= 2) return digitos;
  if (digitos.length <= 6)
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
  if (digitos.length <= 10) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
  }
  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
}

export function nomeValido(valor) {
  const partes = valor
    .trim()
    .split(/\s+/)
    .filter((p) => p.length >= 2);
  return partes.length >= 2;
}

export function limparNome(valor) {
  return valor.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
}

export function telefoneValido(valor) {
  return valor.replace(/\D/g, "").length === 11;
}
