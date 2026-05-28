import { motion } from "framer-motion";
import { useAlerts } from "@/hooks/useAlerts";

export default function Alerts() {
  const { alerts, stats, updateStatus } = useAlerts();

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-4">
        {[{ k: "Open", v: stats.open }, { k: "Acknowledged", v: stats.acknowledged }, { k: "Resolved Today", v: 23 }, { k: "Avg Response", v: "11 min" }].map((i) => (
          <div key={i.k} className="rounded-2xl border border-slate-200 bg-white p-3">
            <p className="text-xs text-slate-500">{i.k}</p>
            <p className="text-2xl font-bold text-slate-900">{i.v}</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="px-3 py-2">Severity</th><th className="px-3 py-2">Alert ID</th><th className="px-3 py-2">Charger ID</th><th className="px-3 py-2">Site</th><th className="px-3 py-2">Alert Type</th><th className="px-3 py-2">Description</th><th className="px-3 py-2">Time</th><th className="px-3 py-2">Status</th><th className="px-3 py-2">Assigned</th><th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((a) => (
              <tr key={a.id} className="border-t border-slate-100 text-slate-700">
                <td className="px-3 py-2">{a.severity}</td><td className="px-3 py-2">{a.id}</td><td className="px-3 py-2">{a.chargerId}</td><td className="px-3 py-2">{a.site}</td><td className="px-3 py-2">{a.type}</td><td className="px-3 py-2">{a.description}</td><td className="px-3 py-2">{a.time}</td><td className="px-3 py-2">{a.status}</td><td className="px-3 py-2">{a.assignedTo}</td>
                <td className="px-3 py-2">
                  <button onClick={() => updateStatus(a.id, "Acknowledged")} className="mr-2 rounded border border-slate-300 px-2 py-1">Ack</button>
                  <button onClick={() => updateStatus(a.id, "Resolved")} className="rounded border border-slate-300 px-2 py-1">Resolve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
