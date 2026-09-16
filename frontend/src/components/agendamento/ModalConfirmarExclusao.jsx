import { useState } from "react";
import Modal from "../ui/Modal";

export default function ModalConfirmarExclusao({ open, onClose, onConfirmar }) {
  const [excluindo, setExcluindo] = useState(false);

  async function handleConfirmar() {
    setExcluindo(true);
    try {
      await onConfirmar();
      onClose();
    } finally {
      setExcluindo(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Excluir agendamento">
      <p className="text-sm text-slate-500 mb-5">
        Tem certeza que deseja excluir este agendamento? Essa ação não pode ser
        desfeita.
      </p>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={handleConfirmar}
          disabled={excluindo}
          className="w-full bg-red-600 text-white rounded-lg px-4 py-2 font-medium
                     hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          {excluindo ? "Excluindo..." : "Sim, excluir"}
        </button>
        <button
          type="button"
          onClick={onClose}
          disabled={excluindo}
          className="w-full rounded-lg px-4 py-2 font-medium text-slate-600
                     border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </Modal>
  );
}
