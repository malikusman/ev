import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { KpiCard } from "@/components/shared/KpiCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { degradationKpis, wearTrend } from "@/data/useCases";
import { remediationSignals } from "@/data/remediationSignals";
import { chargers } from "@/data/chargers";
import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowRight } from "lucide-react";

const degradationSignals = remediationSignals.filter((s) =>
  s.name.includes("Connector") || s.name.includes("Cable")
);

const flaggedChargers = chargers
  .filter((c) => c.status === "Critical" || c.status === "Warning")
  .slice(0, 6)
  .map((c) => {
    const connector = c.metrics.find((m) => m.name === "Connector Wear")?.value ?? 0;
    const cable = c.metrics.find((m) => m.name === "Cable Wear")?.value ?? 0;
    return { ...c, connector, cable };
  });

export default function Degradation() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="space-y-6">
      <p className="text-sm text-slate-600">
        Track connector and cable wear across the fleet. Predict degradation before it causes session failures or safety incidents.
      </p>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Connectors Above Threshold" value={String(degradationKpis.connectorsAboveThreshold)} accent="text-amber-600" animateValue />
        <KpiCard title="Cables Flagged" value={String(degradationKpis.cablesFlagged)} accent="text-red-600" animateValue />
        <KpiCard title="Mean Wear Risk" value={`${degradationKpis.meanWearPercent}%`} accent="text-slate-900" />
        <KpiCard title="Field Dispatches Scheduled" value={String(degradationKpis.fieldDispatches)} sub="next 14 days" accent="text-blue-600" animateValue />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {degradationSignals.map((s) => (
          <div key={s.name} className="rounded-3xl border border-slate-200 bg-white p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">{s.name}</h3>
              <StatusBadge status={s.severity} />
            </div>
            <p className="text-2xl font-bold text-blue-700">{s.value}</p>
            <p className="mt-2 text-sm text-slate-600">{s.insight}</p>
            <div className="mt-3 rounded-xl bg-slate-100 p-2 text-xs text-slate-700">Autonomous Action: {s.action}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <h3 className="mb-3 font-semibold text-slate-900">12-Week Wear Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={wearTrend}>
                <CartesianGrid stroke="#e2e8f0" />
                <XAxis dataKey="week" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Legend />
                <Line dataKey="connector" stroke="#f59e0b" strokeWidth={2} name="Connector wear %" />
                <Line dataKey="cable" stroke="#ef4444" strokeWidth={2} name="Cable wear %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Flagged Chargers</h3>
            <Link to="/fleet" className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
              View fleet <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-slate-500">
                <tr>
                  <th className="px-2 py-2 text-left">ID</th>
                  <th className="px-2 py-2 text-left">Site</th>
                  <th className="px-2 py-2 text-left">Connector</th>
                  <th className="px-2 py-2 text-left">Cable</th>
                  <th className="px-2 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {flaggedChargers.map((c) => (
                  <tr key={c.id} className="border-t border-slate-100">
                    <td className="px-2 py-2 font-medium text-slate-900">{c.id}</td>
                    <td className="px-2 py-2 text-slate-600">{c.site}</td>
                    <td className="px-2 py-2 text-slate-700">{c.connector}%</td>
                    <td className="px-2 py-2 text-slate-700">{c.cable}%</td>
                    <td className="px-2 py-2"><StatusBadge status={c.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
