import { comboMap } from "@/types/combo.type"
import { DragCombo } from "./comboDrag.component"
import { useDroppable } from "@dnd-kit/core"
import { Dispatch, SetStateAction } from "react"

export function DropCombo({ name, combos, data }: {
  name: string,
  combos: string[],
  data: {
    combosMap: comboMap
    ninjaSize: Dispatch<SetStateAction<number>>
}}) {
  const { setNodeRef } = useDroppable({ id: name })
  const combKey = name === "drop-combo-choosed" ? "drop-combo-select" : "drop-combo-choosed"
  return (
    <div ref={setNodeRef} style={{height: combos.length > 15 ? "max-content" : 650}}>
      {combos.map(v => (<DragCombo name={v} key={v} arrangeData={{active: v, combos: data.combosMap, combosKey: combKey , ninjaSize: data.ninjaSize}} />))}
    </div>
  )
}