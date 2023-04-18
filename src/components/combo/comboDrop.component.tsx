import { DragCombo } from "./comboDrag.component"
import { useDroppable } from "@dnd-kit/core"

export function DropCombo({ name, combos }: { name: string, combos: string[] }) {
    const { setNodeRef } = useDroppable({ id: name })
    return (
      <div ref={setNodeRef} style={{height: combos.length > 15 ? "max-content" : 650}}>
        {combos.map(v => (<DragCombo name={v} key={v}/>))}
      </div>
    )
}