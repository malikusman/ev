import { formatInTimeZone } from "date-fns-tz";
import { Bell, Menu, Search, Activity } from "lucide-react";
import { useEffect, useState } from "react";

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

export function Header({ title, onMenuClick }: HeaderProps) {
  const [now, setNow] = useState(new Date());
  const [diagLoading, setDiagLoading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-6 sm:py-4 lg:ml-60">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-xl border border-slate-300 p-2 text-slate-700 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold text-slate-900 sm:text-lg lg:text-xl">{title}</h2>
            <p className="truncate text-xs text-slate-500">
              Last updated {formatInTimeZone(now, "Asia/Dubai", "HH:mm:ss 'GST'")}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="hidden items-center rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-500 md:flex">
            <Search className="mr-2 h-4 w-4" />
            Search chargers, alerts...
          </div>
          <button
            onClick={() => {
              setDiagLoading(true);
              setTimeout(() => setDiagLoading(false), 1200);
            }}
            className="rounded-xl bg-blue-600 px-2.5 py-2 text-xs font-semibold text-white sm:px-3 sm:text-sm"
          >
            <span className="hidden sm:inline">{diagLoading ? "Running..." : "Run Full Diagnostics"}</span>
            <span className="sm:hidden">{diagLoading ? "..." : "Diag"}</span>
          </button>
          <button className="relative rounded-xl border border-slate-300 bg-white p-2 text-slate-700">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 rounded-full bg-red-500 px-1 text-[10px] text-white">3</span>
          </button>
          <Activity className="hidden h-4 w-4 text-cyan-600 sm:block" />
        </div>
      </div>
    </header>
  );
}
