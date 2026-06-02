import {
  Bolt,
  Home,
  Wrench,
  ChartNoAxesCombined,
  Map,
  Bell,
  Settings,
  TrendingDown,
  Plug,
  Coins,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const intelligenceItems = [
  { to: "/use-cases/downtime", label: "Downtime Prevention", icon: TrendingDown },
  { to: "/use-cases/degradation", label: "Connector & Cable Health", icon: Plug },
  { to: "/use-cases/revenue", label: "Revenue Protection", icon: Coins },
];

const operationsItems = [
  { to: "/", label: "Overview", icon: Home },
  { to: "/fleet", label: "Charger Fleet", icon: Bolt },
  { to: "/remediation", label: "Autonomous Remediation", icon: Wrench },
  { to: "/analytics", label: "Analytics & Reports", icon: ChartNoAxesCombined },
  { to: "/map", label: "Site Map", icon: Map },
  { to: "/alerts", label: "Alerts & Incidents", icon: Bell },
  { to: "/settings", label: "Settings", icon: Settings },
];

function NavSection({
  label,
  items,
  onNavigate,
}: {
  label: string;
  items: typeof intelligenceItems;
  onNavigate?: () => void;
}) {
  return (
    <div>
      <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
      <div className="space-y-1">
        {items.map(({ to, label: itemLabel, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm ${
                isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{itemLabel}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className="mb-6 flex items-center gap-2">
        <Bolt className="h-7 w-7 shrink-0 text-blue-600" />
        <div>
          <p className="font-bold text-slate-900">Scorpius</p>
          <p className="text-xs text-slate-500">EV Operations</p>
        </div>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto">
        <NavSection label="Intelligence" items={intelligenceItems} onNavigate={onNavigate} />
        <NavSection label="Operations" items={operationsItems} onNavigate={onNavigate} />
      </nav>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          All Systems Nominal
        </div>
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 shrink-0 rounded-full bg-slate-300" />
          <div>
            <p className="text-slate-900">Ahmed Al Rashid</p>
            <p className="text-slate-500">NOC Lead</p>
          </div>
        </div>
      </div>
    </>
  );
}

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-slate-200 bg-white p-4 lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden" onClick={onClose} aria-hidden="true" />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(100vw-3rem,18rem)] flex-col border-r border-slate-200 bg-white p-4 transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 p-2 text-slate-600"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <SidebarContent onNavigate={onClose} />
      </aside>
    </>
  );
}
