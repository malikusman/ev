import { Charger } from "@/types";
export function ChargerCard({charger}:{charger:Charger}){return <div className="rounded-2xl bg-slate-900 p-3"><p>{charger.id}</p><p className="text-xs text-slate-400">{charger.site}</p></div>;}
