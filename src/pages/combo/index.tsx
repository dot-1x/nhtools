import Content from "@/components/content.component";
import { getAllCombo } from "@/utils/combo/combo.utils";
import { DndContext, DragOverlay, useDraggable, useDroppable } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable"
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { CSS } from "@dnd-kit/utilities"
import { CSSProperties, ReactNode, useState } from "react";


function stripComboId(name: string) {
  return name.replace(/-combo|-hover/i, "")
}

function DropCombo({ name, combos }: { name: string, combos: string[] }) {
  const { setNodeRef, isOver, active } = useDroppable({ id: name })
  return (
    <div ref={setNodeRef} style={{height: 650}}>
      {combos.map(v => (<SortableItem name={v} key={v}/>))}
    </div>
  )
}

function SortableItem( {name}: {name: string}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({id: name});

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <ListGroup.Item variant="dark">{stripComboId(name)}</ListGroup.Item>
    </div>
  );
}

export default function Combo() {
  const [dragged, setDrag] = useState("")
  const combos = [...getAllCombo()].map(v => v.name).sort()
  const [droppedCombo, setDropped] = useState<string[]>([])
  const [dragOver, setDragOver] = useState("")
  return (
    <Content name="Combo">
      <Container className="p-2">
        <Row>
          <DndContext
            onDragStart={(ev) => setDrag(ev.active.id.toString())}
            onDragEnd={(ev) => {
              setDrag("")
            }}
            onDragOver={(ev) => {
            }}
          >
            <Col className="overflow-auto" style={{ maxHeight: 650 }}>
              <ListGroup>
                <DragOverlay>
                  {dragged ? <ListGroup.Item variant="dark">{ dragged }</ListGroup.Item> : null}
                </DragOverlay>
                <SortableContext items={combos} id="choose-combo">
                  <DropCombo name="combo-choose" combos={combos}/>
                </SortableContext>
              </ListGroup>
            </Col>
            <Col className="overflow-auto" style={{ maxHeight: 650 }}>
              <ListGroup>
                <SortableContext items={combos} id="drop-combo">
                  <DropCombo name="combo-choose" combos={droppedCombo}/>
                </SortableContext>
              </ListGroup>
            </Col>
          </DndContext>
        </Row>
      </Container>
    </Content>
  )
}