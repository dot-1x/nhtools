import Content from "@/components/content.component";
import { NinjaImage } from "@/components/ninja.component";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { ReactNode, useState } from "react";
import { Container } from "react-bootstrap";

function DragTest({ children }: {children?: ReactNode}) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: "mydrag1",
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    opacity: "25%"
  } : undefined;

  return (
    <div ref={setNodeRef} style={{ ...style, width: 100, height: 100}} {...listeners} {...attributes}
      // onDrag={ev => { ev.preventDefault() }} // preventing from moving
      className="mx-2 border border-primary"
    >
      { children }
    </div>
  );
}

function DropTest({ children, id }: {children?: ReactNode, id: string}) {
  const { setNodeRef } = useDroppable(
    {
      id: id
    }
  )

  return (
    <div
      ref={setNodeRef}
      className="border border-white"
      style={
        {
          width: 250,
          height: 250
        }
      }
    >
      { children }
    </div>
  )
}

export default function MyDnD() {
  const [done, setDone] = useState<null | number | string>(null)
  return (
    <Content>
      <Container className="p-1">
        <div className="border-start border-primary" style={{height: 68, width: 70}}>
          <div className="border-end border-danger" style={{height: 68, width: 70}}>
            <div className="border-top border-info" style={{height: 68, width: 70}}>
              <div className="border-bottom border-warning text-center" style={{height: 68, width: 70}}>
                <NinjaImage name="silhouette" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Content>
  )
}