const ESTILOS = {
  confirmado: "bg-emerald-50 text-emerald-700 border-emerald-200",
  pendente: "bg-amber-50 text-amber-700 border-amber-200",
  cancelado: "bg-red-50 text-red-700 border-red-200",
};

export default function Badge({ status }) {
  const classe = ESTILOS[status] || ESTILOS.confirmado;
  const label = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${classe}`}
    >
      {label}
    </span>
  );
}
