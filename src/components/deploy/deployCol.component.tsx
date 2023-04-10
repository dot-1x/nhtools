import { useDroppable } from "@dnd-kit/core";
import { Col, Row } from "react-bootstrap";
import { NinjaImage } from "../ninja/ninjaImage.component";
import { T_deployCol, T_dropNinja } from "./types/deploy.type";

function DropNinja({ id, dropped, lastDrop }: T_dropNinja) {
  const { setNodeRef, active, isOver, over } = useDroppable(
    {
      id: id
    }
  )
  let elem
  if (active && isOver) {
    elem = <NinjaImage name={active.id as string} />
  }
  else if (dropped.find((v) => v === id)) {
    elem = <NinjaImage name={lastDrop || "silhouette"} />
  }
  else {
    elem = <NinjaImage name="silhouette" />
  }
  return (
    <div
      ref={setNodeRef}
      className="text-center"
    >
      {
        elem
      }
    </div>
  )
}

export function DeployColumn( { dropped, dropstate }: T_deployCol) {
  return (
    <>
    {
      Array(3).fill(0).map(
        (_, idx) => (
          <Row key={idx} id={`row-${idx}`}>
            {
              Array(5).fill(0).map(
                (_, idx_col) => {
                  const idCol = `col-${idx_col}-row-${idx}`
                  return (
                    <Col key={idCol} className="my-2"
                      onClick={
                        _ => {
                          dropped = dropped.filter((v) => v !== idCol)
                          dropstate(dropped)
                        }
                      }
                    >
                      <DropNinja id={idCol} dropped={dropped} />
                    </Col>
                    // </DropNinja>
                  )
                }
              )
            }
          </Row>
        )
      )
    }
    </>
  )
}