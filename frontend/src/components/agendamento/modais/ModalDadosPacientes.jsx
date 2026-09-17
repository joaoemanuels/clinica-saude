import { useState } from "react";
import {
  formatarTelefone,
  limparNome,
  nomeValido,
  telefoneValido,
} from "../../../utils/formatForm";

import Modal from "../../ui/Modal";

export default function ModalDadosPacientes({ open, onClose, onConfirmar }) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  const podeConfirmar = nomeValido(nome) && telefoneValido(telefone);

  function handleTelefoneChange(e) {
    setTelefone(formatarTelefone(e.target.value));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!podeConfirmar) return;
    onConfirmar({ nome: nome.trim(), telefone });
  }

  return (
    <Modal open={open} onClose={onClose} title="Informe seus dados">
      <p className="text-sm text-slate-500 mb-4">
        Preencha seus dados para confirmar o agendamento.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Nome completo
          </label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(limparNome(e.target.value))}
            placeholder="Ex: João da Silva"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm
             placeholder:text-slate-400 focus:outline-none focus:ring-2
             focus:ring-emerald-500 focus:border-transparent"
          />
          {nome.length > 0 && !nomeValido(nome) && (
            <p className="text-xs text-red-500 mt-1">
              Informe nome e sobrenome.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="telefone"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Telefone
          </label>
          <input
            id="telefone"
            type="tel"
            inputMode="numeric"
            value={telefone}
            onChange={handleTelefoneChange}
            placeholder="(xx) xxxxx-xxxx"
            maxLength={15}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm
                       placeholder:text-slate-400 focus:outline-none focus:ring-2
                       focus:ring-emerald-500 focus:border-transparent"
          />
          {telefone.length > 0 && !telefoneValido && (
            <p className="text-xs text-red-500 mt-1">Telefone incompleto.</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!podeConfirmar}
          className="w-full mt-1 bg-emerald-600 text-white rounded-lg px-4 py-2
                     font-medium hover:bg-emerald-700 transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirmar agendamento
        </button>
      </form>
    </Modal>
  );
}
