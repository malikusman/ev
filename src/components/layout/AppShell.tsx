import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

const titles: Record<string, string> = {
  "/": "Overview Dashboard",
  "/fleet": "Charger Fleet",
  "/remediation": "Autonomous Remediation",
  "/analytics": "Analytics & Reports",
  "/map": "Site Map",
  "/alerts": "Alerts & Incidents",
  "/settings": "Settings",
};

export function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />
      <Header title={titles[pathname] ?? "Scorpius Operations"} />
      <main className="ml-20 p-6 lg:ml-60">
        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-10 rounded-2xl bg-slate-200" />
            <div className="h-56 rounded-3xl bg-white" />
            <div className="h-56 rounded-3xl bg-white" />
          </div>
        ) : (
          children
        )}
        <p className="mt-8 text-center text-xs text-slate-500">
          Powered by Scorpius Autonomous Intelligence · UAE EV Infrastructure Operations
        </p>
      </main>
    </div>
  );
}
