import { X } from "lucide-react";

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 px-4"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-sm md:max-w-md bg-white rounded-2xl p-5 md:p-6 mb-0 sm:mb-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-1">
          <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="p-1.5 -m-1.5 rounded-full text-slate-400 hover:text-slate-600
                       hover:bg-slate-100 active:bg-slate-200 transition-colors
                       focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
