import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { KpiCard } from "@/components/shared/KpiCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { leakageBySite, revenueKpis } from "@/data/useCases";
import { alerts } from "@/data/alerts";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowRight, Shield } from "lucide-react";

const billingAlerts = alerts.filter(
  (a) =>
    a.type === "Session Billing Anomaly" ||
    a.type === "Communication Loss" ||
    a.type === "Output Voltage Unstable"
).slice(0, 8);

export default function Revenue() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="space-y-6">
      <p className="text-sm text-slate-600">
        Protect session revenue with autonomous billing guardrails. Detect anomalies, reconcile sessions, and recover leakage before it compounds.
      </p>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Leakage Detected (est.)" value={`AED ${revenueKpis.leakageDetectedAed.toLocaleString()}`} accent="text-red-600" />
        <KpiCard title="Sessions Protected" value={revenueKpis.sessionsProtected.toLocaleString()} accent="text-emerald-600" animateValue />
        <KpiCard title="Billing Anomalies Open" value={String(revenueKpis.billingAnomaliesOpen)} accent="text-amber-600" animateValue />
        <KpiCard title="Recovery Rate" value={`${revenueKpis.recoveryRate}%`} accent="text-blue-600" />
      </div>

      <div className="flex items-start gap-4 rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
        <Shield className="h-8 w-8 shrink-0 text-emerald-600" />
        <div>
          <p className="font-semibold text-slate-900">Autonomous Billing Guard</p>
          <p className="mt-1 text-sm text-slate-700">
            Scorpius cross-checks session duration, energy delivered, and tariff rules in real time. When a mismatch is detected, billing is paused,
            the session is flagged, and a recovery workflow starts automatically — protecting AED revenue without manual reconciliation.
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <h3 className="mb-3 font-semibold text-slate-900">Estimated Leakage by Site (AED)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leakageBySite}>
                <CartesianGrid stroke="#e2e8f0" />
                <XAxis dataKey="site" stroke="#64748b" tick={{ fontSize: 10 }} angle={-20} textAnchor="end" height={60} />
                <YAxis stroke="#64748b" />
                <Tooltip formatter={(v: number) => [`AED ${v.toLocaleString()}`, "Leakage"]} />
                <Bar dataKey="amount" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Revenue-Related Alerts</h3>
            <Link to="/alerts" className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
              All alerts <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="max-h-64 space-y-2 overflow-auto">
            {billingAlerts.map((a) => (
              <div key={a.id} className="rounded-2xl border border-slate-200 p-3 text-sm">
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-medium text-slate-900">{a.chargerId}</span>
                  <StatusBadge status={a.severity} />
                </div>
                <p className="text-slate-600">{a.type}</p>
                <p className="text-xs text-slate-500">{a.site} · {a.time} · {a.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
