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

  const openDetails = (id: string) => {
    setSelectedId(id);
    setDrawerOpen(true);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search chargers"
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-2"
        />
        <div className="flex gap-3">
          <select className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 sm:w-auto">
            <option>Status</option>
          </select>
          <select className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 sm:w-auto">
            <option>Site</option>
          </select>
        </div>
      </div>

      {/* Mobile card list */}
      <div className="space-y-3 md:hidden">
        {rows.map((c) => (
          <div key={c.id} className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="mb-2 flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-slate-900">{c.id}</p>
                <p className="text-sm text-slate-600">{c.site}</p>
              </div>
              <StatusBadge status={c.status} />
            </div>
            <div className="mb-3 grid grid-cols-2 gap-2 text-sm text-slate-700">
              <p>{c.type}</p>
              <p>{c.temp}°C</p>
              <p>Health {c.health}%</p>
              <p>Uptime {c.uptime.toFixed(1)}%</p>
            </div>
            <button
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              onClick={() => openDetails(c.id)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-3xl border border-slate-200 bg-white md:block">
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
                    onClick={() => openDetails(c.id)}
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
