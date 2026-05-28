import { motion } from "framer-motion";
import { chargers } from "@/data/chargers";
import { useMemo, useState } from "react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ChargerDrawer } from "@/components/chargers/ChargerDrawer";

export default function Fleet() {
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const rows = useMemo(
    () => chargers.filter((c) => `${c.id} ${c.site}`.toLowerCase().includes(q.toLowerCase())).slice(0, 20),
    [q]
  );

  const selected = useMemo(() => chargers.find((c) => c.id === selectedId) ?? null, [selectedId]);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="space-y-4">
      <div className="flex gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search chargers"
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-2"
        />
        <select className="rounded-2xl border border-slate-300 bg-white px-3"><option>Status</option></select>
        <select className="rounded-2xl border border-slate-300 bg-white px-3"><option>Site</option></select>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="text-slate-500">
            <tr>
              {["Charger ID", "Site", "Type", "Status", "Health", "Temp", "Last Session", "Uptime %", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-900">{c.id}</td>
                <td className="px-4 py-3 text-slate-700">{c.site}</td>
                <td className="px-4 py-3 text-slate-700">{c.type}</td>
                <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-28 rounded bg-slate-200">
                      <div className="h-2 rounded bg-cyan-500" style={{ width: `${c.health}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-slate-700">{c.health}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-700">{c.temp}°C</td>
                <td className="px-4 py-3 text-slate-700">{c.lastSession}</td>
                <td className="px-4 py-3 text-slate-700">{c.uptime.toFixed(1)}%</td>
                <td className="px-4 py-3">
                  <button
                    className="rounded-lg border border-slate-300 px-2 py-1 text-slate-700 hover:bg-slate-50"
                    onClick={() => {
                      setSelectedId(c.id);
                      setDrawerOpen(true);
                    }}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ChargerDrawer charger={selected} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </motion.div>
  );
}
