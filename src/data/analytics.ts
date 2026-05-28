export const faultFrequency=[{name:"Temperature",count:34,fill:"#f43f5e"},{name:"Connector",count:28,fill:"#f59e0b"},{name:"Cable",count:19,fill:"#f97316"},{name:"Voltage",count:22,fill:"#06b6d4"},{name:"Sensor",count:15,fill:"#6366f1"},{name:"End-of-Life",count:11,fill:"#10b981"}];
export const uptimeBySite=[{name:"Dubai Mall",uptime:98.2},{name:"Al Quoz",uptime:96.7},{name:"Business Bay",uptime:94.1},{name:"Marina Walk",uptime:91.8},{name:"Abu Dhabi Airport",uptime:89.3},{name:"Sharjah Industrial",uptime:87.5}];
export const remediationTrend=Array.from({length:12}).map((_,i)=>({week:`W${i+1}`,auto:62+i*2.2,field:38-i*1.7}));
export const fleetHealthTrend=Array.from({length:30}).map((_,i)=>({day:`D${i+1}`,actual:74+(i%8)+Math.floor(i/8),predicted:75+(i%7)+Math.floor(i/9)}));
export const radarHealth=[{metric:"Temp",score:78},{metric:"Connector",score:72},{metric:"Cable",score:69},{metric:"Sensor",score:83},{metric:"Lifecycle",score:76},{metric:"Output",score:81}];
