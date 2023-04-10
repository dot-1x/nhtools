import Content from "@/components/content.component";
import { useState } from "react";
import { Container, Dropdown, DropdownButton, Row, Col } from "react-bootstrap";
import Head from "next/head";
import { ChooseContainer, NinjaImage } from "@/components/ninja/ninja.component";
import DeployColumn from "@/components/deploy/deployCol.component";
import { DndContext, DragOverlay, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { dropData } from "@/types/deploy.types";
import { stripColName } from "@/utils/ninja/ninja.utils";

export default function Deploy() {
  const [CHOOSED, setChoosed] = useState("SSS")
  const [dragged, setDragged] = useState("")
  const [dropped, setDropped] = useState<dropData>(new Map())
  const [onbox, setOnBox] = useState(false)
  const mouseSensor = useSensor(
    MouseSensor, {
      activationConstraint: {
        distance: 25,
        delay: 2
      }
    }
  )
  const touchSens = useSensor(
    TouchSensor, {
      activationConstraint: {
        distance: 25
      }
    }
  )

  return (
    <>
      <Head>
        <title>Deploy Constructor</title>
      </Head>
      <Content name="Deploy">
        <Container className="bg-dark p-2">
          <h3 className="text-center">Deploy tool</h3>
          <p className="text-center">Tools utilitas untuk mengkombinasi deploy</p>
          <DropdownButton title="Choose Ninja">
            {
              ["SSS", "SS", "S", "A", "B", "C", "D"].map(
                v => (
                  <Dropdown.Item key={v} onClick={ev => setChoosed(ev.currentTarget.id)} id={v}>
                    {v}
                  </Dropdown.Item>
                )
              )
            }
          </DropdownButton>
          <DndContext
            sensors={ [ touchSens ] }
            onDragStart={(ev) => { setDragged(stripColName(ev.active.id.toString())) }}
            onDragEnd={
              (ev) => {
                setDragged("")
                if (ev.over && ev.active) {
                  dropped.set(ev.over.id.toString(), stripColName(ev.active.id.toString()))
                  setDropped(dropped)
                  setOnBox(true)
                }
                else {
                  setOnBox(false)
                }
              }
            }
          >
            {
              CHOOSED && <ChooseContainer choosed={CHOOSED}/>
            }

            <DragOverlay
              dropAnimation={{
                duration: !onbox ? 500 : 0
              }}
            >
              {dragged ? <NinjaImage name={dragged.replaceAll("-", " ")}/> : null}
            </DragOverlay>

            <Row>
              <Col >
                <DeployColumn dropped={dropped} dropstate={setDropped}/>
              </Col>
            </Row>
          </DndContext>
        </Container>
      </Content>
    </>
  )
}