export const executiveSummary = {
  aedSaved: 184000,
  incidentsPrevented: 47,
  autonomousActions: 142,
};

export const useCaseCards = [
  {
    id: "downtime",
    path: "/use-cases/downtime",
    title: "Charger Downtime Prediction & Prevention",
    description: "Predict failures before they happen and autonomously prevent costly charger downtime.",
    metric: "12 failures predicted · 38h downtime avoided",
  },
  {
    id: "degradation",
    path: "/use-cases/degradation",
    title: "Connector & Cable Degradation",
    description: "Monitor wear patterns and schedule proactive maintenance before connector failures.",
    metric: "19 connectors flagged · 68% avg wear risk",
  },
  {
    id: "revenue",
    path: "/use-cases/revenue",
    title: "Revenue Leakage Prevention",
    description: "Detect billing anomalies and protect session revenue across the UAE fleet.",
    metric: "AED 42,800 leakage detected · 94% recovery rate",
  },
];

export const downtimeKpis = {
  predictedFailures: 12,
  chargersAtRisk: 18,
  downtimeHoursAvoided: 38,
  autonomousPreventions: 14,
};

export const atRiskChargers = [
  { id: "DXB-RTA-042", site: "Dubai Mall", predictedIssue: "Cooling degradation + power module instability", riskWindow: "48h", action: "Remote throttle + field dispatch", severity: "Critical" as const },
  { id: "DXB-FLEET-117", site: "Al Quoz Fleet Depot", predictedIssue: "Thermal drift under peak load", riskWindow: "72h", action: "Sensor recalibration", severity: "Warning" as const },
  { id: "SHJ-ZONE-305", site: "Sharjah Industrial", predictedIssue: "Output stability decline", riskWindow: "5d", action: "Scheduled maintenance", severity: "Warning" as const },
  { id: "AUH-ZONE-208", site: "Abu Dhabi Airport", predictedIssue: "Connector resistance trending high", riskWindow: "6d", action: "Connector inspection", severity: "Warning" as const },
  { id: "DXB-ZONE-103", site: "Marina Walk", predictedIssue: "Cable wear threshold approaching", riskWindow: "8d", action: "Cable harness check", severity: "Healthy" as const },
];

export const degradationKpis = {
  connectorsAboveThreshold: 19,
  cablesFlagged: 11,
  meanWearPercent: 68,
  fieldDispatches: 7,
};

export const wearTrend = Array.from({ length: 12 }).map((_, i) => ({
  week: `W${i + 1}`,
  connector: 52 + i * 1.8,
  cable: 48 + i * 1.5,
}));

export const revenueKpis = {
  leakageDetectedAed: 42800,
  sessionsProtected: 1247,
  billingAnomaliesOpen: 6,
  recoveryRate: 94,
};

export const leakageBySite = [
  { site: "Dubai Mall", amount: 8200 },
  { site: "Marina Walk", amount: 11400 },
  { site: "Sharjah Industrial", amount: 6800 },
  { site: "Business Bay", amount: 4200 },
  { site: "Al Quoz", amount: 5600 },
  { site: "Abu Dhabi Airport", amount: 6600 },
];
