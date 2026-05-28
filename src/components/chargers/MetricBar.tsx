export function MetricBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <p className="font-medium text-slate-700">{label}</p>
        <p className="font-semibold text-slate-900">{value}%</p>
      </div>
      <div className="h-2 rounded bg-slate-200">
        <div className="h-2 rounded bg-cyan-500" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
