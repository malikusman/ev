export type Severity = "Critical" | "Warning" | "Healthy" | "Offline";
export interface Charger { id:string; site:string; type:"DC Fast"|"AC Level 2"; status:Severity; health:number; temp:number; lastSession:string; uptime:number; technician:string; maintenanceDate:string; metrics:{name:string;value:number}[]; }
export interface Alert { id:string; severity:Severity; chargerId:string; site:string; type:string; description:string; time:string; status:"Open"|"Acknowledged"|"Resolved"; assignedTo:string; }
export interface Site { name:string; region:string; chargers:number; health:number; critical:number; x:number; y:number; }
export interface RemediationSignal { name:string; value:string; severity:Severity; insight:string; action:string; }
