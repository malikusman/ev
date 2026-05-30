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

function NavSection({ label, items }: { label: string; items: typeof intelligenceItems }) {
  return (
    <div>
      <p className="mb-2 hidden px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400 lg:block">{label}</p>
      <div className="space-y-1">
        {items.map(({ to, label: itemLabel, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            title={itemLabel}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-3 py-2 text-sm ${
                isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="hidden lg:inline">{itemLabel}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-20 flex-col border-r border-slate-200 bg-white p-4 lg:w-60">
      <div className="mb-6 flex items-center gap-2">
        <Bolt className="h-7 w-7 shrink-0 text-blue-600" />
        <div className="hidden lg:block">
          <p className="font-bold text-slate-900">Scorpius</p>
          <p className="text-xs text-slate-500">EV Operations</p>
        </div>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto pb-28">
        <NavSection label="Intelligence" items={intelligenceItems} />
        <NavSection label="Operations" items={operationsItems} />
      </nav>

      <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          All Systems Nominal
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <div className="h-7 w-7 rounded-full bg-slate-300" />
          <div>
            <p className="text-slate-900">Ahmed Al Rashid</p>
            <p className="text-slate-500">NOC Lead</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
