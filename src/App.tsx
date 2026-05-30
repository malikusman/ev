import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import Dashboard from "@/pages/Dashboard";
import Fleet from "@/pages/Fleet";
import Remediation from "@/pages/Remediation";
import Analytics from "@/pages/Analytics";
import SiteMap from "@/pages/SiteMap";
import Alerts from "@/pages/Alerts";
import Settings from "@/pages/Settings";
import Downtime from "@/pages/use-cases/Downtime";
import Degradation from "@/pages/use-cases/Degradation";
import Revenue from "@/pages/use-cases/Revenue";

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/use-cases/downtime" element={<Downtime />} />
        <Route path="/use-cases/degradation" element={<Degradation />} />
        <Route path="/use-cases/revenue" element={<Revenue />} />
        <Route path="/fleet" element={<Fleet />} />
        <Route path="/remediation" element={<Remediation />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/map" element={<SiteMap />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
