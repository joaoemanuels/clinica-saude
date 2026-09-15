import { Link } from "react-router-dom";

export default function NavItem({ to, icon: Icon, label, isActive }) {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center gap-1 px-3 py-1 text-xs font-medium transition-colors ${
        isActive ? "text-emerald-600" : "text-slate-400"
      }`}
    >
      <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
      <span>{label}</span>
    </Link>
  );
}
