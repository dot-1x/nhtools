import Content from "@/components/content.component";
import { getAllCombo, getCombo, getParentKey, getTotalCombo, stripDragID } from "@/utils/combo/combo.utils";
import { DndContext, DragOverlay, MouseSensor, TouchSensor, useDraggable, useDroppable, useSensor } from "@dnd-kit/core";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { useState } from "react";
import { ComboTable } from "@/components/combo.component";
import { getNinjaByCombo } from "@/utils/ninja/ninja.utils";
import { comboMap } from "@/types/combo.type";
import { ComboButton } from "@/components/combo/comboButtons.component";
import { DropCombo } from "@/components/combo/comboDrop.component";
import Head from "next/head";

type comboKeyData = "combo_select" | "combo_choosed"


export default function Combo() {
  const sortedCombo = [...getAllCombo()].map(v => v.name).sort()
  const [totalNinja, setNinjas] = useState(0)
  const [dragged, setDrag] = useState("")
  const [combos, setCombos] = useState<comboMap>({
    combo_select: sortedCombo,
    combo_choosed: []
  })
  const mouseSens = useSensor(
    MouseSensor, {
      activationConstraint: {
        distance: 0,
      }
    }
  )
  const touchSens = useSensor(
    TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 0
      }
    }
  )
  return (
  <>
    <Head>
      <title>Combo Calculator</title>
    </Head>
    <Content name="Combo">
      <Container className="p-2">
        <ComboButton totalNinjas={totalNinja} setCombos={setCombos} setNinjas={setNinjas} />
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
              if (!ev.over) return;
              const activeID = ev.active.id as string
              if (combos.combo_choosed.includes(activeID))
                combos.combo_choosed.splice(combos.combo_choosed.indexOf(activeID), 1)
              if (combos.combo_select.includes(activeID))
                combos.combo_select.splice(combos.combo_select.indexOf(activeID), 1)
              const overID = ev.over.id as string
              const key = getParentKey(overID) as comboKeyData
              combos[key].push(activeID)
              combos[key].sort()
              let ninjas = getNinjaByCombo(combos.combo_choosed)
              setNinjas(ninjas.size)
              if (ninjas.size > 15) {
                if (combos.combo_choosed.includes(activeID))
                  combos.combo_choosed.splice(combos.combo_choosed.indexOf(activeID), 1)
                combos.combo_select.push(activeID)
                combos.combo_select.sort()
                setTimeout(() => setNinjas(getNinjaByCombo(combos.combo_choosed).size), 500)
              }
            }}
          >
            <Col>
              <h4 className="text-center">Pilih Combo</h4>
              <ListGroup className="overflow-auto" style={{ maxHeight: 650 }}>
                <DragOverlay>
                  {dragged ? <ListGroup.Item variant="info">{ stripDragID(dragged) }</ListGroup.Item> : null}
                </DragOverlay>
                <DropCombo name="drop-combo-select" combos={combos.combo_select}/>
              </ListGroup>
            </Col>
            <Col>
              <h4 className="text-center">Taruh Sini</h4>
              <ListGroup className="overflow-auto" style={{ maxHeight: 650 }}>
                <DropCombo name="drop-combo-choosed" combos={combos.combo_choosed}/>
              </ListGroup>
            </Col>
          </DndContext>
        </Row>
        <ComboTable ninjas={[...getNinjaByCombo(combos.combo_choosed)]} />
        <Button variant="primary">
          Total Attrubute: {
            [...getTotalCombo(combos.combo_choosed.map(v => getCombo(v))).entries()]
              .map(([attr, num]) => `${attr}: ${num}`).join(", ")
          }
        </Button>
      </Container>
    </Content>
  </>
  )
}