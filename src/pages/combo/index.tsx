import Content from "@/components/content.component"
import {
  getAllCombo,
  getCombo,
  arrangeCombo,
  getTotalCombo,
  stripDragID,
} from "@/utils/combo.utils"
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
} from "@dnd-kit/core"
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap"
import { useRef, useState } from "react"
import { ComboTable } from "@/components/combo.component"
import { getNinjaByCombo } from "@/utils/ninja.utils"
import { comboMap, sortStratType } from "@/types/combo.type"
import {
  Clear,
  Filter,
  TotalNinja,
} from "@/components/combo/comboButtons.component"
import { DropCombo } from "@/components/combo/comboDrop.component"
import Head from "next/head"
import Title from "@/components/ui-elements/title.ui"

export default function Combo() {
  const [totalNinja, setNinjaSize] = useState(0)
  const [dragged, setDrag] = useState("")
  const [combos, setCombos] = useState<comboMap>({
    combo_select: [...getAllCombo()].map((v) => v.name).sort(),
    combo_choosed: [],
  })
  const sortStratRef = useRef<sortStratType>("Nama")
  const mouseSens = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 0,
    },
  })
  const touchSens = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 0,
    },
  })

  return (
    <>
      <Head>
        <title>Combo Calculator</title>
      </Head>
      <Content name="Combo">
        <Title
          title="Combo Tool"
          bg="/assets/bg/w4.png"
          desc="Tools meracik combo sesuai combo yang tersedia, pilih urutan combo yang diinginkan, tarik ke sebelah kanan sampai ninja >=15"
        />
        <Container className="px-4 px-md-0">
          <h2 className="fs-1 text-uppercase" style={{ letterSpacing: "1px" }}>
            List Combo
          </h2>
          <Row className="d-flex flex-column flex-md-row ">
            <DndContext
              sensors={[mouseSens, touchSens]}
              autoScroll={false}
              onDragStart={(ev) => {
                setDrag(ev.active.id.toString())
              }}
              onDragEnd={() => {
                setDrag("")
              }}
              onDragOver={(ev) => {
                if (!ev.over) return
                arrangeCombo({
                  active: ev.active.id.toString(),
                  combos: combos,
                  combosKey: ev.over.id.toString(),
                  ninjaSize: setNinjaSize,
                  sortStrat: sortStratRef,
                })
              }}
            >
              <Col className="bg-soft-dark-primary-3 p-4 me-md-2 rounded">
                {/* btn filter */}
                <Filter
                  setCombos={setCombos}
                  stratRef={sortStratRef}
                  combos={combos}
                />
                {/* card */}
                <ListGroup
                  className="overflow-auto "
                  style={{ maxHeight: 600 }}
                >
                  <DragOverlay>
                    {dragged ? (
                      <div className="bg-primary text-dark-primary rounded">
                        <p
                          className="teko-font p-3"
                          style={{ fontSize: "27px" }}
                        >
                          {stripDragID(dragged)}
                        </p>
                      </div>
                    ) : null}
                  </DragOverlay>
                  <DropCombo
                    name="drop-combo-select"
                    combos={combos.combo_select}
                    data={{
                      ninjaSize: setNinjaSize,
                      combosMap: combos,
                      sortStrat: sortStratRef,
                    }}
                  />
                </ListGroup>
              </Col>
              <Col className="bg-soft-dark-primary-3 p-4 my-4 my-md-0 ms-md-3 rounded ">
                {/* btn clear */}
                <div className="d-flex flex-row justify-content-between align-items-start">
                  <TotalNinja totalNinjas={totalNinja} />
                  <Clear setCombos={setCombos} setNinjas={setNinjaSize} />
                </div>
                {/* card list */}
                <div className="d-flex flex-column justify-content-between "></div>
                <ListGroup className="overflow-auto" style={{ maxHeight: 460 }}>
                  <DropCombo
                    name="drop-combo-choosed"
                    combos={combos.combo_choosed}
                    data={{
                      ninjaSize: setNinjaSize,
                      combosMap: combos,
                      sortStrat: sortStratRef,
                    }}
                  />
                  {/* total ninja */}
                </ListGroup>
                <p className="fs-4 teko-font mt-4 mb-2">Total Attrubute : </p>
                <Button
                  variant="primary"
                  className="fs-5  align-self-start text-capitalize"
                >
                  {[
                    ...getTotalCombo(
                      combos.combo_choosed.map((v) => getCombo(v))
                    ).entries(),
                  ]
                    .map(([attr, num]) => `${attr}: ${num}`)
                    .join(", ")}
                </Button>
              </Col>
            </DndContext>
          </Row>
        </Container>
        <Container className="my-5 pt-2 pt-lg-4 px-4 px-md-0">
          <h2 className="fs-1 text-uppercase" style={{ letterSpacing: "1px" }}>
            DETAIL COMBO NINJA{" "}
          </h2>
          <Row>
            <Col className={"bg-soft-dark-primary-3 p-4 rounded "}>
              <ComboTable ninjas={[...getNinjaByCombo(combos.combo_choosed)]} />
            </Col>
          </Row>
        </Container>
      </Content>
    </>
  )
}
