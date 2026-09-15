import { HeartPulse, Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
      <div className="flex items-center gap-2">
        <HeartPulse className="w-6 h-6 text-emerald-600" strokeWidth={2.5} />
        <span className="font-semibold text-slate-800">Clínica Saúde</span>
      </div>

      <button
        type="button"
        aria-label="Abrir menu"
        className="p-1 text-slate-600 hover:text-slate-800"
      >
        <Menu className="w-6 h-6" />
      </button>
    </header>
  );
}
