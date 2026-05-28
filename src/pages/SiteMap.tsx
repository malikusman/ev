import { motion } from "framer-motion";
import { sites } from "@/data/sites";

export default function SiteMap() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="space-y-4">
      <div className="relative h-[520px] overflow-hidden rounded-3xl border border-slate-200 bg-white p-4">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full opacity-50">
          <path
            d="M20 75 L30 70 L38 63 L42 57 L50 52 L58 45 L68 43 L75 36 L84 30 L86 24 L78 20 L67 22 L58 18 L49 22 L42 28 L35 33 L30 40 L26 48 L21 57 Z"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.2"
          />
        </svg>
        {sites.map((s) => {
          const critical = s.critical > 1;
          const warn = s.health < 90;
          const color = critical ? "bg-red-500" : warn ? "bg-amber-400" : "bg-emerald-400";
          return (
            <div key={s.name} className="group absolute" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
              <div className={`h-3 w-3 rounded-full ${color} ${critical ? "animate-pulse" : ""}`} />
              <div className="pointer-events-none absolute left-4 top-0 hidden w-52 rounded-xl border border-slate-200 bg-white p-2 text-xs shadow-md group-hover:block">
                <p className="font-semibold text-slate-900">{s.name}</p>
                <p className="text-slate-600">{s.region}</p>
                <p className="text-slate-700">{s.chargers} chargers · {s.health}% healthy</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {sites.map((s) => (
          <div key={s.name} className="rounded-2xl border border-slate-200 bg-white p-3">
            <p className="font-semibold text-slate-900">{s.name}</p>
            <p className="text-xs text-slate-500">{s.region}</p>
            <p className="text-sm text-slate-700">{s.chargers} chargers · {s.health}% healthy</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
