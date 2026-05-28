import { cn } from "@/lib/utils";
import { Severity } from "@/types";

const styles: Record<Severity, string> = {
  Critical: "bg-red-100 text-red-700 border-red-200",
  Warning: "bg-amber-100 text-amber-700 border-amber-200",
  Healthy: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Offline: "bg-slate-200 text-slate-700 border-slate-300",
};

export function StatusBadge({ status }: { status: Severity }) {
  return <span className={cn("rounded-full border px-2.5 py-1 text-xs font-semibold", styles[status])}>{status}</span>;
}
