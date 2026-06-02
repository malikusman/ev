import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { KpiCard } from "@/components/shared/KpiCard";
import { fleetHealthTrend } from "@/data/analytics";
import { alerts } from "@/data/alerts";
import { sites } from "@/data/sites";
import { executiveSummary, useCaseCards } from "@/data/useCases";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ArrowRight, TrendingDown, Plug, Coins } from "lucide-react";

const useCaseIcons = { downtime: TrendingDown, degradation: Plug, revenue: Coins };

export default function Dashboard() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 to-blue-900 p-5 text-white shadow-lg">
        <p className="text-xs font-medium uppercase tracking-wider text-blue-200">Executive Summary · UAE Fleet</p>
        <p className="mt-2 text-base font-semibold sm:text-lg md:text-xl">
          AED {executiveSummary.aedSaved.toLocaleString()} saved · {executiveSummary.incidentsPrevented} incidents prevented ·{" "}
          {executiveSummary.autonomousActions} autonomous actions this month
        </p>
        <p className="mt-1 text-sm text-slate-300">Detect. Predict. Remediate. — Scorpius Autonomous Intelligence</p>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">Fleet Intelligence</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {useCaseCards.map((card) => {
            const Icon = useCaseIcons[card.id as keyof typeof useCaseIcons];
            return (
              <Link
                key={card.id}
                to={card.path}
                className="group rounded-3xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-md"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="font-semibold text-slate-900 group-hover:text-blue-700">{card.title}</p>
                <p className="mt-2 text-sm text-slate-600">{card.description}</p>
                <p className="mt-3 text-xs font-medium text-blue-600">{card.metric}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                  Open module <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Total Active Chargers" value="247 / 260" />
        <KpiCard title="Critical Alerts Today" value="8" accent="text-red-600" animateValue />
        <KpiCard title="Avg Fleet Health Score" value="81%" accent="text-emerald-600" />
        <KpiCard title="Preventive Actions Taken" value="14" sub="this week" accent="text-cyan-700" animateValue />
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
              <div key={a.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-slate-800">{a.time} · {a.chargerId}</p>
                  <p className="text-xs text-slate-500">Autonomous remediation sequence initiated</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
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
