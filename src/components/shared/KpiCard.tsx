import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(0, { stiffness: 80, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}

export function KpiCard({
  title,
  value,
  sub,
  accent,
  animateValue,
}: {
  title: string;
  value: string;
  sub?: string;
  accent?: string;
  animateValue?: boolean;
}) {
  const numericMatch = value.match(/^(\d+)/);
  const numericValue = numericMatch ? parseInt(numericMatch[1], 10) : null;
  const suffix = numericMatch ? value.slice(numericMatch[1].length) : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <p className="text-sm text-slate-500">{title}</p>
      <p className={`mt-2 text-3xl font-bold ${accent ?? "text-slate-900"}`}>
        {animateValue && numericValue !== null ? (
          <>
            <AnimatedNumber value={numericValue} />
            {suffix}
          </>
        ) : (
          value
        )}
      </p>
      {sub && <p className="mt-1 text-xs text-slate-500">{sub}</p>}
    </motion.div>
  );
}
