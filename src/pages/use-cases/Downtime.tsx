import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { KpiCard } from "@/components/shared/KpiCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { atRiskChargers, downtimeKpis } from "@/data/useCases";
import { fleetHealthTrend } from "@/data/analytics";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowRight } from "lucide-react";
import { Severity } from "@/types";

export default function Downtime() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="space-y-6">
      <p className="text-sm text-slate-600">
        Predict charger failures before they impact uptime. Scorpius correlates telemetry, sessions, and environmental data to trigger autonomous prevention.
      </p>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Predicted Failures (7d)" value={String(downtimeKpis.predictedFailures)} accent="text-red-600" animateValue />
        <KpiCard title="Chargers at Risk" value={String(downtimeKpis.chargersAtRisk)} accent="text-amber-600" animateValue />
        <KpiCard title="Downtime Hours Avoided" value={String(downtimeKpis.downtimeHoursAvoided)} sub="this month" accent="text-emerald-600" animateValue />
        <KpiCard title="Autonomous Preventions" value={String(downtimeKpis.autonomousPreventions)} sub="this week" accent="text-blue-600" animateValue />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <h3 className="mb-3 font-semibold text-slate-900">Predicted vs Actual Fleet Health</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={fleetHealthTrend}>
                <CartesianGrid stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="actual" stroke="#2563eb" fill="#2563eb22" name="Actual" />
                <Area type="monotone" dataKey="predicted" stroke="#06b6d4" fill="#06b6d41f" strokeDasharray="5 5" name="Predicted" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Top At-Risk Chargers</h3>
            <Link to="/remediation" className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
              View remediation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-2">
            {atRiskChargers.map((c) => (
              <div key={c.id} className="rounded-2xl border border-slate-200 p-3">
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-medium text-slate-900">{c.id}</span>
                  <StatusBadge status={c.severity as Severity} />
                </div>
                <p className="text-xs text-slate-500">{c.site} · Risk window: {c.riskWindow}</p>
                <p className="mt-1 text-sm text-slate-700">{c.predictedIssue}</p>
                <p className="mt-1 text-xs font-medium text-blue-700">→ {c.action}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-slate-900">Hero case: DXB-RTA-042</p>
            <p className="text-sm text-slate-600">Critical thermal anomaly — autonomous remediation in progress</p>
          </div>
          <Link to="/remediation" className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
            Open Autonomous Remediation
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
