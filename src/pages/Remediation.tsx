import { motion } from "framer-motion";
import { remediationSignals } from "@/data/remediationSignals";
import { useSelectedCharger } from "@/hooks/useSelectedCharger";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { toast } from "sonner";
import { useState } from "react";
import { Severity } from "@/types";
import { CheckCircle2 } from "lucide-react";

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
  const [approved, setApproved] = useState(false);
  const [step4Done, setStep4Done] = useState(false);

  const displayStatus: Severity = approved && selectedId === "DXB-RTA-042" ? "Warning" : selected.status;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="space-y-5">
      {approved && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
        >
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          Remediation approved — charger stabilized remotely. Work order #WO-2024-0847 dispatched. SLA recovery in progress.
        </motion.div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {featured.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedId(c.id)}
            className={`rounded-3xl border p-4 text-left ${selectedId === c.id ? "border-blue-300 bg-blue-50" : "border-slate-200 bg-white"}`}
          >
            <p className="font-semibold text-slate-900">{c.id}</p>
            <p className="text-xs text-slate-500">{c.site}</p>
            <div className="mt-2">
              <StatusBadge status={approved && c.id === "DXB-RTA-042" ? "Warning" : c.status} />
            </div>
          </button>
        ))}
      </div>

      <div className={`rounded-3xl border bg-white p-5 text-slate-900 transition-colors ${approved ? "border-emerald-200" : "border-slate-200"}`}>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold">{selected.id}</h3>
          <StatusBadge status={displayStatus} />
        </div>
        <p className={`rounded-2xl border p-3 text-sm ${approved ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-amber-200 bg-amber-50 text-amber-900"}`}>
          {approved
            ? "AI Assessment: Remote stabilization successful. Thermal load normalized. Field technician en route for connector verification."
            : "AI Assessment: Thermal and power anomalies indicate elevated risk. Recommended action is remote stabilization followed by targeted technician dispatch."}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-white">Autonomy Confidence</span>
          <span className="text-2xl font-bold text-blue-700">{approved ? "94%" : "87%"}</span>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {selected.metrics.map((m) => (
            <div key={m.name}>
              <div className="mb-1 flex items-center justify-between">
                <p className="text-xs text-slate-600">{m.name}</p>
                <p className="text-xs font-semibold text-slate-900">{approved ? Math.max(m.value - 12, 10) : m.value}%</p>
              </div>
              <div className="h-2 rounded bg-slate-200">
                <motion.div
                  className="h-2 rounded bg-blue-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${approved ? Math.max(m.value - 12, 10) : m.value}%` }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {remediationSignals.map((s) => (
          <div key={s.name} className="rounded-3xl border border-slate-200 bg-white p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-slate-900">{s.name}</h3>
              <StatusBadge status={s.severity} />
            </div>
            <p className="text-2xl font-bold text-blue-700">{s.value}</p>
            <p className="mt-2 text-sm text-slate-600">{s.insight}</p>
            <div className="mt-3 rounded-xl bg-slate-100 p-2 text-xs text-slate-700">Autonomous Action: {s.action}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-semibold text-slate-900">Remediation Workflow</h3>
            <span className={`w-fit rounded-full px-3 py-1 text-xs ${approved ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
              {approved ? "Approved & Executing" : "Human Approval Required"}
            </span>
          </div>
          <div className="space-y-2">
            {workflow.map((w, i) => {
              const done = i < 3 || (i === 3 && step4Done) || (approved && i < 5);
              return (
                <div key={w} className={`flex items-center gap-3 rounded-xl border p-2 ${done ? "border-emerald-200 bg-emerald-50/50" : "border-slate-200"}`}>
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${done ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-700"}`}>
                    {done ? "✓" : i + 1}
                  </div>
                  <p className="text-sm text-slate-700">{w}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 text-slate-900">
          <h3 className="mb-3 font-semibold">Remediation Plan</h3>
          <div className="space-y-2 text-sm">
            <div className="rounded-xl bg-amber-50 p-3 text-amber-900">
              <p className="font-medium">Immediate Safe Action</p>
              <p className="mt-1 text-xs">Throttle output current by 18% and force thermal recalibration</p>
            </div>
            <div className="rounded-xl bg-slate-100 p-3">
              <p className="font-medium">Field Work Order</p>
              <p className="mt-1 text-xs">Connector replacement + cable harness inspection — Omar Saeed</p>
            </div>
            <div className="rounded-xl bg-cyan-50 p-3 text-cyan-900">
              <p className="font-medium">Verification</p>
              <p className="mt-1 text-xs">Stability check and SLA recovery within 45 minutes</p>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button
              disabled={approving || approved}
              onClick={() => {
                setApproving(true);
                setTimeout(() => {
                  setApproving(false);
                  setApproved(true);
                  setStep4Done(true);
                  toast.success("Remediation approved. Work order #WO-2024-0847 created. Technician dispatched.");
                }, 2000);
              }}
              className="rounded-xl bg-blue-700 px-4 py-2 text-white disabled:opacity-60 sm:flex-1"
            >
              {approving ? "Approving..." : approved ? "Approved" : "Approve Remediation"}
            </button>
            <button className="rounded-xl border border-slate-300 px-4 py-2 sm:flex-1">Create Ticket Only</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
