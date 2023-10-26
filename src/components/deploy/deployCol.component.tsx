import { useDroppable } from "@dnd-kit/core"
import { Col, Row } from "react-bootstrap"
import { NinjaImage, DragNinja } from "../ninja.component"
import { T_deployCol, T_dropNinja } from "./types/deploy.type"
import { stripColName } from "@/utils/ninja.utils"

function DropNinja({ id, dropped }: T_dropNinja) {
  const { setNodeRef, active, isOver } = useDroppable({
    id: id,
  });
  let elem;
  if (active && isOver) {
    elem = <NinjaImage name={stripColName(active.id as string)} />;
  } else if (dropped.get(id)) {
    elem = (
      <DragNinja id={`${id}-${dropped.get(id)}`}>
        <NinjaImage name={dropped.get(id) || 'silhouette'} />
      </DragNinja>
    );
    // elem = <NinjaImage name={dropped.get(id) || "silhouette"} />
  } else {
    elem = <NinjaImage name="silhouette" />;
  }
  return (
    <div ref={setNodeRef} className="text-center ">
      {elem}
    </div>
  );
}

export function DeployColumn({ dropped, dropstate }: T_deployCol) {
  return (
    <div className="mx-lg-auto align-self-center">
      {Array(3)
        .fill(0)
        .map((_, idx) => (
          <Row key={idx} id={`row-${idx} `} className="align-items-center my-3 my-md-4">
            {Array(5)
              .fill(0)
              .map((_, idx_col) => {
                const idCol = `col-${idx_col}-row-${idx}`;
                return (
                  <Col
                    key={idCol}
                    onClick={() => {
                      dropped.delete(idCol);
                      dropstate(new Map(dropped));
                    }}
                  >
                    <DropNinja id={idCol} dropped={dropped} />
                  </Col>
                );
              })}
          </Row>
        ))}
    </div>
  );
}
