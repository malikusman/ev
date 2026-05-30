import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

const titles: Record<string, string> = {
  "/": "Overview Dashboard",
  "/use-cases/downtime": "Charger Downtime Prediction & Prevention",
  "/use-cases/degradation": "Connector & Cable Degradation",
  "/use-cases/revenue": "Revenue Leakage Prevention",
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
  }, [pathname]);

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />
      <Header title={titles[pathname] ?? "Scorpius Operations"} />
      <main className="ml-20 p-6 lg:ml-60">
        <div className="mb-4 flex items-center justify-between rounded-2xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-900">
          <span className="font-medium">Live UAE fleet snapshot</span>
          <span className="text-blue-700">GST · Detect. Predict. Remediate.</span>
        </div>
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
