import { RemediationSignal } from "@/types";
export const remediationSignals: RemediationSignal[] = [
{name:"Charger Temperature",value:"78°C",severity:"Critical",insight:"Rapid heat rise under sustained load in peak hour window.",action:"Throttle output current by 18% and force thermal recalibration."},
{name:"Connector Degradation",value:"72% wear",severity:"Warning",insight:"Contact resistance trend predicts connector instability.",action:"Schedule connector replacement in next field dispatch."},
{name:"Cable Wear Prediction",value:"68% risk",severity:"Warning",insight:"Sheath friction pattern indicates fatigue progression.",action:"Bundle cable harness inspection with connector service."},
{name:"Voltage / Current Anomaly",value:"412V / 188A",severity:"Critical",insight:"Transient oscillation exceeds expected regulation envelope.",action:"Run safe restart diagnostics with reduced ramp profile."},
{name:"Sensor / Hardware Failure",value:"64% confidence",severity:"Warning",insight:"Telemetry mismatch likely from thermal probe drift.",action:"Validate sensor pack and recalibrate monitoring module."},
{name:"End-of-Life Component",value:"82% lifecycle",severity:"Warning",insight:"Power module approaching expected service boundary.",action:"Pre-stage replacement module to avoid future outage."},
];
