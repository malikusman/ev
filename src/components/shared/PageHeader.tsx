export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return <div><h1 className="text-2xl font-bold text-white">{title}</h1>{subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}</div>;
}
