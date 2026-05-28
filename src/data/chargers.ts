import { Charger } from "@/types";
export const chargers: Charger[] = [
  { id:"DXB-RTA-042",site:"Dubai Mall",type:"DC Fast",status:"Critical",health:62,temp:78,lastSession:"10m ago",uptime:91.2,technician:"Omar Saeed",maintenanceDate:"2026-06-03",metrics:[{name:"Temperature Risk",value:85},{name:"Connector Wear",value:72},{name:"Cable Wear",value:68},{name:"Sensor Confidence",value:64},{name:"Component Lifecycle",value:82},{name:"Output Stability",value:58}]},
  { id:"DXB-FLEET-117",site:"Al Quoz Fleet Depot",type:"DC Fast",status:"Warning",health:74,temp:66,lastSession:"18m ago",uptime:94.7,technician:"Fatima Noor",maintenanceDate:"2026-06-06",metrics:[{name:"Temperature Risk",value:61},{name:"Connector Wear",value:55},{name:"Cable Wear",value:53},{name:"Sensor Confidence",value:76},{name:"Component Lifecycle",value:66},{name:"Output Stability",value:70}]},
  { id:"DXB-HOTEL-009",site:"Business Bay Hotel",type:"AC Level 2",status:"Healthy",health:93,temp:44,lastSession:"5m ago",uptime:98.1,technician:"Rashid Karim",maintenanceDate:"2026-06-12",metrics:[{name:"Temperature Risk",value:22},{name:"Connector Wear",value:28},{name:"Cable Wear",value:24},{name:"Sensor Confidence",value:92},{name:"Component Lifecycle",value:33},{name:"Output Stability",value:90}]},
  ...Array.from({ length: 17 }).map((_, i) => ({
    id:
      i < 7
        ? `DXB-ZONE-${(100 + i).toString().padStart(3, "0")}`
        : i < 12
          ? `AUH-ZONE-${(200 + i).toString().padStart(3, "0")}`
          : `SHJ-ZONE-${(300 + i).toString().padStart(3, "0")}`,
    site: ["Dubai Mall", "Al Quoz Fleet Depot", "Business Bay Hotel", "Marina Walk", "Abu Dhabi Airport", "Sharjah Industrial"][i % 6],
    type: (i % 3 === 0 ? "AC Level 2" : "DC Fast") as Charger["type"],
    status: (i % 9 === 0 ? "Critical" : i % 4 === 0 ? "Warning" : "Healthy") as Charger["status"],
    health: 70 + (i % 25),
    temp: 41 + (i % 34),
    lastSession: `${5 + i}m ago`,
    uptime: 87 + (i % 12),
    technician: ["Ahmed Nasser", "Lina Yusuf", "Hassan Ali", "Sara Khan"][i % 4],
    maintenanceDate: `2026-06-${String(10 + (i % 16)).padStart(2, "0")}`,
    metrics: [
      { name: "Temperature Risk", value: 20 + (i % 70) },
      { name: "Connector Wear", value: 18 + (i % 65) },
      { name: "Cable Wear", value: 17 + (i % 64) },
      { name: "Sensor Confidence", value: 40 + (i % 50) },
      { name: "Component Lifecycle", value: 35 + (i % 55) },
      { name: "Output Stability", value: 38 + (i % 48) },
    ],
  }))
];
