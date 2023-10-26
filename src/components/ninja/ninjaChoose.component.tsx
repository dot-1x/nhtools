import { useDraggable } from "@dnd-kit/core"
import { getAllNinja } from "@/utils/ninja.utils"
import { NinjaImage } from "./ninjaImage.component"
import React, { ReactNode, useState } from "react"
import { SelectNinjaButton } from "../deploy.component"

export function DragNinja({
  children,
  id,
}: {
  children: ReactNode
  id: string
}) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id,
  })

  return (
    <div
      ref={setNodeRef}
      // style={style}
      {...listeners}
      {...attributes}
      // onDrag={ev => { ev.preventDefault() }} // preventing from moving
      className=" "
    >
      {children}
    </div>
  )
}

export function ChooseNinja() {
  const [CHOOSED, setChoosed] = useState("SSS")
  const found = [...getAllNinja()].filter((v) => v.kelas === CHOOSED)
  return (
    <>
      {found && (
        <>
          <h2 className="fs-1 text-uppercase" style={{ letterSpacing: "1px" }}>
            List Ninja
          </h2>
          <div className="bg-soft-dark-primary-3 p-3 p-md-4 me-md-2 rounded mb-2 mb-md-5">
            <SelectNinjaButton setChoosed={setChoosed} />
            <div
              className="overflow-x-auto overflow-y-hidden p-1 d-flex flex-row pb-4 "
              onScroll={(ev) => {
                ev.preventDefault()
              }}
            >
              {found.map((v) => (
                <div className="mx-2" key={v.name}>
                  <DragNinja id={v.name.replaceAll(" ", "-")}>
                    <NinjaImage key={v.name} name={v.name} />
                  </DragNinja>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}
