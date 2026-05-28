import { motion } from "framer-motion";
import { useState } from "react";

export default function Settings() {
  const [temp, setTemp] = useState(75);
  const [health, setHealth] = useState(70);
  const [cable, setCable] = useState(65);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="grid gap-4 xl:grid-cols-2">
      <div className="rounded-3xl border border-slate-200 bg-white p-4">
        <h3 className="font-semibold text-slate-900">Notification Thresholds</h3>
        <p className="text-xs text-slate-500">Temperature Alert: {temp}°C</p>
        <input type="range" min={50} max={100} value={temp} onChange={(e) => setTemp(Number(e.target.value))} className="w-full" />
        <p className="text-xs text-slate-500">Health Score Critical Threshold: {health}%</p>
        <input type="range" min={40} max={95} value={health} onChange={(e) => setHealth(Number(e.target.value))} className="w-full" />
        <p className="text-xs text-slate-500">Cable Wear Warning: {cable}%</p>
        <input type="range" min={40} max={95} value={cable} onChange={(e) => setCable(Number(e.target.value))} className="w-full" />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-4">
        <h3 className="font-semibold text-slate-900">Autonomous Actions Policy</h3>
        <div className="mt-2 space-y-2 text-sm text-slate-700">
          <label className="flex justify-between"><span>Allow Auto-Throttle</span><input type="checkbox" defaultChecked /></label>
          <label className="flex justify-between"><span>Allow Auto-Restart</span><input type="checkbox" defaultChecked /></label>
          <label className="flex justify-between"><span>Require Human Approval for Field Dispatch</span><input type="checkbox" defaultChecked /></label>
        </div>
        <select className="mt-3 w-full rounded-xl border border-slate-300 bg-white p-2">
          <option>15 min</option><option>30 min</option><option>1 hour</option>
        </select>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-4">
        <h3 className="font-semibold text-slate-900">SLA Configuration</h3>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <input className="rounded-xl border border-slate-300 bg-white p-2" defaultValue="15" />
          <input className="rounded-xl border border-slate-300 bg-white p-2" defaultValue="4" />
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-4">
        <h3 className="font-semibold text-slate-900">System Info</h3>
        <p className="mt-2 text-sm text-slate-600">Version 2.3.1 · Last Sync 12:10 GST · Fleet 260 · Env Production</p>
      </div>
    </motion.div>
  );
}
