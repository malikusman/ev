import { formatInTimeZone } from "date-fns-tz";
import { Bell, Search, Activity } from "lucide-react";
import { useEffect, useState } from "react";

export function Header({ title }: { title: string }) {
  const [now, setNow] = useState(new Date());
  const [diagLoading, setDiagLoading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="sticky top-0 z-20 ml-20 border-b border-slate-200 bg-white/90 px-6 py-4 backdrop-blur lg:ml-60">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          <p className="text-xs text-slate-500">Last updated {formatInTimeZone(now, "Asia/Dubai", "HH:mm:ss 'GST'")}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-500 md:flex">
            <Search className="mr-2 h-4 w-4" />Search chargers, alerts...
          </div>
          <button
            onClick={() => {
              setDiagLoading(true);
              setTimeout(() => setDiagLoading(false), 1200);
            }}
            className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white"
          >
            {diagLoading ? "Running..." : "Run Full Diagnostics"}
          </button>
          <button className="relative rounded-xl border border-slate-300 bg-white p-2 text-slate-700">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 rounded-full bg-red-500 px-1 text-[10px] text-white">3</span>
          </button>
          <Activity className="h-4 w-4 text-cyan-600" />
        </div>
      </div>
    </header>
  );
}
