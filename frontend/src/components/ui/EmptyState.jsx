import { CalendarX } from "lucide-react";

export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center text-center py-12 px-4">
      <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-4">
        <CalendarX className="w-6 h-6 text-slate-400" />
      </div>
      <h2 className="font-semibold text-slate-700">{title}</h2>
      {description && (
        <p className="text-sm text-slate-400 mt-1 max-w-xs">{description}</p>
      )}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 bg-emerald-600 text-white rounded-lg px-4 py-2 text-sm
                     font-medium hover:bg-emerald-700 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
