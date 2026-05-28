import { useMemo, useState } from "react";
import { alerts as seed } from "@/data/alerts";

export function useAlerts() {
  const [alerts, setAlerts] = useState(seed);
  const stats = useMemo(() => ({
    open: alerts.filter((a) => a.status === "Open").length,
    acknowledged: alerts.filter((a) => a.status === "Acknowledged").length,
    resolved: alerts.filter((a) => a.status === "Resolved").length,
  }), [alerts]);
  const updateStatus = (id: string, status: "Open"|"Acknowledged"|"Resolved") => setAlerts((prev) => prev.map((a)=>a.id===id?{...a,status}:a));
  return { alerts, stats, updateStatus };
}
