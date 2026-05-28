import { motion } from "framer-motion";
import { KpiCard } from "@/components/shared/KpiCard";
import { fleetHealthTrend } from "@/data/analytics";
import { alerts } from "@/data/alerts";
import { sites } from "@/data/sites";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { StatusBadge } from "@/components/shared/StatusBadge";

export default function Dashboard() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Total Active Chargers" value="247 / 260" />
        <KpiCard title="Critical Alerts Today" value="8" accent="text-red-600" />
        <KpiCard title="Avg Fleet Health Score" value="81%" accent="text-emerald-600" />
        <KpiCard title="Preventive Actions Taken" value="14" sub="this week" accent="text-cyan-700" />
      </div>

      <div className="grid gap-6 xl:grid-cols-5">
        <div className="xl:col-span-3 rounded-3xl border border-slate-200 bg-white p-5">
          <h3 className="mb-3 font-semibold text-slate-900">Fleet Health Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={fleetHealthTrend}>
                <CartesianGrid stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="actual" stroke="#2563eb" fill="#2563eb22" />
                <Area type="monotone" dataKey="predicted" stroke="#06b6d4" fill="#06b6d41f" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="xl:col-span-2 rounded-3xl border border-slate-200 bg-white p-5">
          <h3 className="mb-3 font-semibold text-slate-900">Live Alert Feed</h3>
          <div className="max-h-72 space-y-2 overflow-auto pr-1">
            {alerts.slice(0, 12).map((a) => (
              <div key={a.id} className="rounded-2xl border border-slate-200 p-3 text-sm">
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-medium text-slate-800">{a.chargerId}</span>
                  <span className={a.severity === "Critical" ? "h-2 w-2 rounded-full bg-red-500 animate-pulse" : "h-2 w-2 rounded-full bg-amber-400"} />
                </div>
                <p className="text-slate-600">{a.site} · {a.type}</p>
                <p className="text-xs text-slate-500">{a.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-5">
        <div className="xl:col-span-3 rounded-3xl border border-slate-200 bg-white p-5">
          <h3 className="mb-3 font-semibold text-slate-900">Recent Autonomous Actions</h3>
          <div className="space-y-2">
            {alerts.slice(0, 8).map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-2xl border border-slate-200 p-3">
                <div>
                  <p className="text-sm text-slate-800">{a.time} · {a.chargerId}</p>
                  <p className="text-xs text-slate-500">Autonomous remediation sequence initiated</p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={a.severity} />
                  <button className="rounded-lg border border-slate-300 px-2 py-1 text-xs text-slate-700">Approve</button>
                  <button className="rounded-lg border border-slate-300 px-2 py-1 text-xs text-slate-700">View</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-2 rounded-3xl border border-slate-200 bg-white p-5">
          <h3 className="mb-3 font-semibold text-slate-900">Site Health Summary</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sites}>
                <CartesianGrid stroke="#e2e8f0" />
                <XAxis dataKey="name" hide />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="health" fill="#06b6d4" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
