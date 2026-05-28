import { useMemo, useState } from "react";
import { chargers } from "@/data/chargers";

export function useSelectedCharger() {
  const [selectedId, setSelectedId] = useState("DXB-RTA-042");
  const selected = useMemo(() => chargers.find((c) => c.id === selectedId) ?? chargers[0], [selectedId]);
  return { selected, selectedId, setSelectedId, featured: chargers.slice(0, 3) };
}
