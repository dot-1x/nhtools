import { DragOverlay, useDraggable } from "@dnd-kit/core";
import { getAllNinja } from "@/utils/ninja/ninja.utils";
import { NinjaImage } from "./ninjaImage.component";
import React, { ReactNode } from "react";

function DragNinja({ children, id }: {children: ReactNode, id: string}) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: id,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    opacity: "25%"
  } : undefined;

  return (
    <span ref={setNodeRef} style={style} {...listeners} {...attributes}
      onDrag={ev => { ev.preventDefault() }} // preventing from moving
      className="mx-2"
    >
      {children}
    </span>
  );
}

function ChooseNinja({ kelas }: { kelas: string }) {
  const found = [...getAllNinja()].filter(v => v.kelas === kelas)
  return (
    <div
      className="overflow-auto p-2"
      style={{
        whiteSpace: "nowrap"
      }}
      onScroll={(ev) => { ev.preventDefault() }}
    >
      {
        found.map(
          (v) => (
            <DragNinja id={v.name.replaceAll(" ", "-")} key={v.name}><NinjaImage name={v.name} key={v.name} /></DragNinja>
          )
        )
      }
    </div>
  )
}

export function ChooseContainer({ choosed, dragged }: { choosed: string, dragged: string }) {
  return (
    <>
      <ChooseNinja kelas={ choosed } />
      <DragOverlay>
        {dragged ? <NinjaImage name={dragged.replaceAll("-", " ")}/> : null}
      </DragOverlay>
    </>
  )
}