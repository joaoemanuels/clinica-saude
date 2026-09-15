import { HeartPulse, Menu, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const isNovoAtivo = location.pathname === "/";
  const isMeusAtivo = location.pathname === "/meus-agendamentos";

  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-3 bg-white border-b border-slate-200">
      <div className="flex items-center gap-2">
        <HeartPulse className="w-6 h-6 text-emerald-600" strokeWidth={2.5} />
        <span className="font-semibold text-slate-800">Clínica Saúde</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${
              isNovoAtivo
                ? "text-emerald-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Novo Agendamento
          </Link>
          <Link
            to="/meus-agendamentos"
            className={`text-sm font-medium transition-colors ${
              isMeusAtivo
                ? "text-emerald-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Meus Agendamentos
          </Link>
        </nav>

        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
          <User className="w-4 h-4 text-slate-500" />
        </div>
      </div>

      <button
        type="button"
        aria-label="Abrir menu"
        className="md:hidden p-1 text-slate-600 hover:text-slate-800"
      >
        <Menu className="w-6 h-6" />
      </button>
    </header>
  );
}