import { useEffect, useState } from "react";
import Modal from "../ui/Modal";

export default function ModalEditarAgendamento({
  open,
  agendamento,
  onClose,
  onSalvar,
}) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (agendamento) {
      setNome(agendamento.name);
      setTelefone(agendamento.phone);
    }
  }, [agendamento]);

  const podeSalvar = nome.trim().length > 0 && telefone.trim().length > 0;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!podeSalvar || !agendamento) return;

    setSalvando(true);
    try {
      await onSalvar(agendamento.id, { name: nome, phone: telefone });
      onClose();
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Editar agendamento">
      <p className="text-sm text-slate-500 mb-4">
        Atualize os dados do paciente para este agendamento.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="edit-nome"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Nome completo
          </label>
          <input
            id="edit-nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="edit-telefone"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Telefone
          </label>
          <input
            id="edit-telefone"
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={!podeSalvar || salvando}
          className="w-full mt-1 bg-emerald-600 text-white rounded-lg px-4 py-2
                     font-medium hover:bg-emerald-700 transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {salvando ? "Salvando..." : "Salvar alterações"}
        </button>
      </form>
    </Modal>
  );
}
