import { comboMap, sortStratType } from "@/types/combo.type"
import { DragCombo } from "./comboDrag.component"
import { useDroppable } from "@dnd-kit/core"
import { Dispatch, MutableRefObject, SetStateAction } from "react"

export function DropCombo({
  name,
  combos,
  data,
}: {
  name: string
  combos: string[]
  data: {
    combosMap: comboMap
    ninjaSize: Dispatch<SetStateAction<number>>
    sortStrat: MutableRefObject<sortStratType>
  }
}) {
  const { setNodeRef } = useDroppable({ id: name })
  const combKey =
    name === "drop-combo-choosed" ? "drop-combo-select" : "drop-combo-choosed"
  return (
    <div ref={setNodeRef} style={{ height: combos.length > 15 ? 'max-content' : 650 }}>
      {combos.map((v) => (
        <DragCombo
          active={name === 'drop-combo-choosed' && true}
          name={v}
          key={v}
          arrangeData={{
            active: v,
            combos: data.combosMap,
            combosKey: combKey,
            ninjaSize: data.ninjaSize,
            sortStrat: data.sortStrat,
          }}
        />
      ))}
    </div>
  );
}
