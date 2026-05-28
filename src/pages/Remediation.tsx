import { motion } from "framer-motion";
import { remediationSignals } from "@/data/remediationSignals";
import { useSelectedCharger } from "@/hooks/useSelectedCharger";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { toast } from "sonner";
import { useState } from "react";

const workflow = [
  "Detect anomaly across EL-MAT telemetry",
  "Correlate charger health, billing session, and environmental context",
  "Identify likely root cause: cooling degradation + power module instability",
  "Apply safe remote action: reduce output current and restart diagnostics",
  "Create technician work order with required parts",
  "Verify charger stability and SLA recovery",
];

export default function Remediation() {
  const { featured, selectedId, setSelectedId, selected } = useSelectedCharger();
  const [approving, setApproving] = useState(false);
  const [step4Done, setStep4Done] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        {featured.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedId(c.id)}
            className={`rounded-3xl border p-4 text-left ${selectedId === c.id ? "border-blue-300 bg-blue-50" : "border-slate-200 bg-white"}`}
          >
            <p className="font-semibold text-slate-900">{c.id}</p>
            <p className="text-xs text-slate-500">{c.site}</p>
            <div className="mt-2"><StatusBadge status={c.status} /></div>
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 text-slate-900">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold">{selected.id}</h3>
          <StatusBadge status={selected.status} />
        </div>
        <p className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          AI Assessment: Thermal and power anomalies indicate elevated risk. Recommended action is remote stabilization followed by targeted technician dispatch.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {selected.metrics.map((m) => (
            <div key={m.name}>
              <div className="mb-1 flex items-center justify-between">
                <p className="text-xs text-slate-600">{m.name}</p>
                <p className="text-xs font-semibold text-slate-900">{m.value}%</p>
              </div>
              <div className="h-2 rounded bg-slate-200"><div className="h-2 rounded bg-blue-600" style={{ width: `${m.value}%` }} /></div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {remediationSignals.map((s) => (
          <div key={s.name} className="rounded-3xl border border-slate-200 bg-white p-4">
            <div className="mb-2 flex items-center justify-between"><h3 className="text-slate-900">{s.name}</h3><StatusBadge status={s.severity} /></div>
            <p className="text-2xl font-bold text-blue-700">{s.value}</p>
            <p className="mt-2 text-sm text-slate-600">{s.insight}</p>
            <div className="mt-3 rounded-xl bg-slate-100 p-2 text-xs text-slate-700">Autonomous Action: {s.action}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Remediation Workflow</h3>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-800">Human Approval Required</span>
          </div>
          <div className="space-y-2">
            {workflow.map((w, i) => (
              <div key={w} className="flex items-center gap-3 rounded-xl border border-slate-200 p-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-700">{i + 1}</div>
                <p className="text-sm text-slate-700">{w} {i < 3 || (i === 3 && step4Done) ? "✓" : "↻"}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 text-slate-900">
          <h3 className="mb-3 font-semibold">Remediation Plan</h3>
          <div className="space-y-2 text-sm">
            <div className="rounded-xl bg-amber-50 p-2 text-amber-900">Immediate Safe Action</div>
            <div className="rounded-xl bg-slate-100 p-2">Field Work Order</div>
            <div className="rounded-xl bg-cyan-50 p-2 text-cyan-900">Verification</div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => {
                setApproving(true);
                setTimeout(() => {
                  setApproving(false);
                  setStep4Done(true);
                  toast.success("Remediation approved. Work order #WO-2024-0847 created. Technician dispatched.");
                }, 2000);
              }}
              className="rounded-xl bg-blue-700 px-4 py-2 text-white"
            >
              {approving ? "Approving..." : "Approve Remediation"}
            </button>
            <button className="rounded-xl border border-slate-300 px-4 py-2">Create Ticket Only</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
