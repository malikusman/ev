import { motion } from "framer-motion";
import { faultFrequency, radarHealth, remediationTrend, uptimeBySite } from "@/data/analytics";
import { toast } from "sonner";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Analytics() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="space-y-5">
      <div className="flex justify-between">
        <div className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700">Last 30 days</div>
        <button onClick={() => toast.message("Generating PDF...")} className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white">Export Report</button>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="h-72 rounded-3xl border border-slate-200 bg-white p-4">
          <h3 className="text-slate-900">Fault Frequency by Type</h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={faultFrequency}>
              <CartesianGrid stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="h-72 rounded-3xl border border-slate-200 bg-white p-4">
          <h3 className="text-slate-900">Health Score Distribution</h3>
          <ResponsiveContainer width="100%" height="90%">
            <RadarChart data={radarHealth}>
              <PolarGrid stroke="#cbd5e1" />
              <PolarAngleAxis dataKey="metric" stroke="#334155" />
              <Tooltip />
              <Radar dataKey="score" stroke="#06b6d4" fill="#06b6d444" />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="h-72 rounded-3xl border border-slate-200 bg-white p-4">
          <h3 className="text-slate-900">Remediation Success Rate</h3>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={remediationTrend}>
              <CartesianGrid stroke="#e2e8f0" />
              <XAxis dataKey="week" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Line dataKey="auto" stroke="#10b981" />
              <Line dataKey="field" stroke="#f59e0b" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="h-72 rounded-3xl border border-slate-200 bg-white p-4">
          <h3 className="text-slate-900">Charger Uptime by Site</h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={uptimeBySite} layout="vertical">
              <CartesianGrid stroke="#e2e8f0" />
              <XAxis type="number" stroke="#64748b" />
              <YAxis type="category" dataKey="name" stroke="#64748b" width={100} />
              <Tooltip />
              <Bar dataKey="uptime" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
        Mean Time To Repair: 47 min | Preventive vs Reactive ratio: 68% / 32% | Cost Avoidance (est.): AED 184,000 this month | Sessions Protected: 1,247
      </div>
    </motion.div>
  );
}
