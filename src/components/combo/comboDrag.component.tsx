import { arrangeData } from "@/types/combo.type"
import { arrangeCombo, getCombo, stripDragID } from "@/utils/combo.utils"
import { useDraggable } from "@dnd-kit/core"
import { Image, ListGroup } from "react-bootstrap"

export function DragCombo({
  name,
  arrangeData,
}: {
  name: string
  arrangeData: arrangeData
}) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id: name })
  const combo = getCombo(name)
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={() => {
        arrangeCombo(arrangeData)
      }}
    >
      <ListGroup.Item variant="primary">
        <span className="position-absolute top-1 start-50 translate-middle badge text-danger">
          {combo.attrValues}
        </span>
        {stripDragID(name)}
        {combo.ninjasName.map((v) => (
          <Image
            className="m-1"
            alt={name}
            src={`/assets/roleHeads/${v}.png`}
            width={25}
            height={25}
            key={v}
          />
        ))}
      </ListGroup.Item>
    </div>
  )
}
