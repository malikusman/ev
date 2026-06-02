import { X } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Charger } from "@/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { MetricBar } from "./MetricBar";

const trendData = Array.from({ length: 12 }).map((_, i) => ({
  hour: `${i * 2}:00`,
  voltage: 390 + (i % 4) * 6,
  current: 160 + (i % 5) * 4,
}));

const history = [
  "2026-05-22 · Cooling module recalibrated",
  "2026-05-15 · Connector torque adjustment",
  "2026-04-30 · Sensor suite verification",
  "2026-04-12 · Firmware patch v2.9.7",
];

interface ChargerDrawerProps {
  charger: Charger | null;
  open: boolean;
  onClose: () => void;
}

export function ChargerDrawer({ charger, open, onClose }: ChargerDrawerProps) {
  if (!charger) return null;

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-slate-900/30" onClick={onClose} />}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-xl transform overflow-y-auto border-l border-slate-200 bg-white p-4 shadow-2xl transition-transform duration-300 sm:p-5 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{charger.id}</h3>
            <p className="text-sm text-slate-600">{charger.site}</p>
            <div className="mt-2"><StatusBadge status={charger.status} /></div>
          </div>
          <button className="rounded-xl border border-slate-300 p-2 text-slate-600" onClick={onClose}>
            <X className="h-4 w-4" />
          </button>
        </div>

        <button className="mb-5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Run Diagnostics</button>

        <div className="mb-5 grid gap-3 md:grid-cols-2">
          {charger.metrics.map((metric) => (
            <MetricBar key={metric.name} label={metric.name} value={metric.value} />
          ))}
        </div>

        <div className="mb-5 rounded-2xl border border-slate-200 p-3">
          <p className="mb-2 text-sm font-semibold text-slate-800">Voltage & Current (last 24h)</p>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <XAxis dataKey="hour" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line dataKey="voltage" stroke="#2563eb" strokeWidth={2} dot={false} />
                <Line dataKey="current" stroke="#06b6d4" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-3">
          <p className="mb-2 text-sm font-semibold text-slate-800">Maintenance History</p>
          <div className="space-y-2 text-sm text-slate-700">
            {history.map((item) => (
              <p key={item}>• {item}</p>
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm">
            <p><span className="font-semibold">Upcoming:</span> {charger.maintenanceDate}</p>
            <p><span className="font-semibold">Assigned Technician:</span> {charger.technician}</p>
          </div>
        </div>
      </aside>
    </>
  );
}
