import { stripDragID } from "@/utils/combo/combo.utils";
import { useDraggable } from "@dnd-kit/core";
import { ListGroup } from "react-bootstrap";

export function DragCombo({ name }: { name: string }) {
    const {
      attributes,
      listeners,
      setNodeRef,
    } = useDraggable({id: name});

    return (
      <div ref={setNodeRef} {...attributes} {...listeners}>
        <ListGroup.Item variant="primary">{stripDragID(name)}</ListGroup.Item>
      </div>
    );
  }