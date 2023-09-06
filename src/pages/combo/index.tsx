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
import { useState } from "react"
import { ComboTable } from "@/components/combo.component"
import { getNinjaByCombo } from "@/utils/ninja.utils"
import { comboMap } from "@/types/combo.type"
import { ComboButton } from "@/components/combo/comboButtons.component"
import { DropCombo } from "@/components/combo/comboDrop.component"
import Head from "next/head"
import { Combo as CombClass } from "@/models/combo/combo.models"

type sortStratType = "Nama" | "Attack" | "Defend" | "HP" | "Agility"
const sortStratMap = {
  Nama: (combs: CombClass[]) => combs.map((v) => v.name).sort(),
  Attack: (combs: CombClass[]) =>
    combs.sort((a, b) => b.attrs.attack - a.attrs.attack).map((v) => v.name),
  Defend: (combs: CombClass[]) =>
    combs.sort((a, b) => b.attrs.defend - a.attrs.defend).map((v) => v.name),
  HP: (combs: CombClass[]) =>
    combs.sort((a, b) => b.attrs.hp - a.attrs.hp).map((v) => v.name),
  Agility: (combs: CombClass[]) =>
    combs.sort((a, b) => b.attrs.agility - a.attrs.agility).map((v) => v.name),
}

export default function Combo() {
  const [totalNinja, setNinjaSize] = useState(0)
  const [dragged, setDrag] = useState("")
  const [sortStrat, setSort] = useState<sortStratType>("Attack")
  const [combos, setCombos] = useState<comboMap>({
    combo_select: [...getAllCombo()].map((v) => v.name).sort(),
    combo_choosed: [],
  })
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
        <Container className="p-2">
          <h3 className="text-center">Combo tool</h3>
          <p className="text-center">
            Tools utilitas untuk mengkombinasi combo
          </p>
          <p>Jika total ninja &gt; 15, tidak dapat menambah combo lagi</p>
          <ComboButton
            totalNinjas={totalNinja}
            setCombos={setCombos}
            setNinjas={setNinjaSize}
          />
          <Row>
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
                })
              }}
            >
              <Col>
                <h4 className="text-center">Pilih Combo</h4>
                <ListGroup className="overflow-auto" style={{ maxHeight: 650 }}>
                  <DragOverlay>
                    {dragged ? (
                      <ListGroup.Item variant="info">
                        {stripDragID(dragged)}
                      </ListGroup.Item>
                    ) : null}
                  </DragOverlay>
                  <DropCombo
                    name="drop-combo-select"
                    combos={combos.combo_select}
                    data={{ ninjaSize: setNinjaSize, combosMap: combos }}
                  />
                </ListGroup>
              </Col>
              <Col>
                <h4 className="text-center">Taruh Sini</h4>
                <ListGroup className="overflow-auto" style={{ maxHeight: 650 }}>
                  <DropCombo
                    name="drop-combo-choosed"
                    combos={combos.combo_choosed}
                    data={{ ninjaSize: setNinjaSize, combosMap: combos }}
                  />
                </ListGroup>
              </Col>
            </DndContext>
          </Row>
          <ComboTable ninjas={[...getNinjaByCombo(combos.combo_choosed)]} />
          <Button variant="primary">
            Total Attrubute:{" "}
            {[
              ...getTotalCombo(
                combos.combo_choosed.map((v) => getCombo(v))
              ).entries(),
            ]
              .map(([attr, num]) => `${attr}: ${num}`)
              .join(", ")}
          </Button>
        </Container>
      </Content>
    </>
  )
}
