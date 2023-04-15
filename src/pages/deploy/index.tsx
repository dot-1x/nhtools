import Content from "@/components/content.component";
import Head from "next/head";
import { DeployColumn, DeployTopButton, DeployFooter } from "@/components/deploy.component";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ChooseNinja, NinjaImage } from "@/components/ninja.component";
import { DndContext, DragOverlay, TouchSensor, useSensor, MouseSensor } from "@dnd-kit/core";
import { dropData } from "@/types/deploy.types";
import { stripColName } from "@/utils/ninja/ninja.utils";
import { ComboTable } from "@/components/combo.component";

export default function Deploy() {
  const [CHOOSED, setChoosed] = useState("SSS")
  const [dragged, setDragged] = useState("")
  const [dropped, setDropped] = useState<dropData>(new Map())
  const [onbox, setOnBox] = useState(false)
  const pointerSens = useSensor(
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
        <title>Deploy Construct</title>
      </Head>
      <Content name="Deploy">
        <Container className="bg-dark p-2">
          <h3 className="text-center">Deploy tool</h3>
          <p className="text-center">Tools utilitas untuk mengkombinasi deploy</p>
          <p>Click icon ninja dalam deploy untuk menghapus ninja</p>
          <p>Click tombol choose ninja untuk memilih kelas ninja</p>
          <p>Click clear deploy untuk menhapus semua ninja dalam deploy</p>
          <p>Click total Attributes untuk copy total attribute</p>
          <DeployTopButton setChoosed={setChoosed} setDropped={setDropped}/>
          <DndContext
            sensors={ [ touchSens, pointerSens ] }
            onDragStart={(ev) => { setDragged(stripColName(ev.active.id.toString())) }}
            onDragEnd={
              (ev) => {
                setDragged("")
                if (ev.over && ev.active) {
                  dropped.set(ev.over.id.toString(), stripColName(ev.active.id.toString()))
                  // setDropped(dropped)
                  setOnBox(true)
                }
                else {
                  setOnBox(false)
                }
              }
            }
          >
            {
              CHOOSED && <ChooseNinja kelas={CHOOSED}/>
            }

            <DragOverlay
              dropAnimation={{ duration: !onbox ? 500 : 0 }}
              // style={{ touchAction: "none" }}
            >
              {dragged ? <NinjaImage name={dragged.replaceAll("-", " ")}/> : null}
            </DragOverlay>

            <Row>
              <Col lg={5}>
                <DeployColumn dropped={dropped} dropstate={setDropped}/>
              </Col>
              <Col lg={7}>
                <ComboTable dropped={dropped}/>
              </Col>
            </Row>
          </DndContext>
          <DeployFooter dropped={ dropped } />
        </Container>
      </Content>
    </>
  )
}