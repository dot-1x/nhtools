import Content from "@/components/content.component"
import Head from "next/head"
import {
  DeployColumn,
  DeployTopButton,
  DeployFooter,
  ConectedPipe,
} from "@/components/deploy.component"
import { useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { ChooseNinja, NinjaImage } from "@/components/ninja.component"
import {
  DndContext,
  DragOverlay,
  TouchSensor,
  useSensor,
  MouseSensor,
} from "@dnd-kit/core"
import { dropData } from "@/types/deploy.types"
import { stripColName } from "@/utils/ninja.utils"
import { ComboTable } from "@/components/combo.component"
import Title from "@/components/ui-elements/title.ui"

export default function DeployGen() {
  const [dragged, setDragged] = useState("")
  const [dropped, setDropped] = useState<dropData>(new Map())
  const [onbox, setOnBox] = useState(false)

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
        <title>Deploy Generator</title>
      </Head>
      <Content name="Deploy">
        <Title
          title="Deploy Generator Tool"
          bg="/assets/bg/w1.png"
          desc="Convert dropped ninjas to JSON"
        />
        <Container className="bg-dark-primary ">
          <DndContext
            autoScroll={false}
            sensors={[touchSens, mouseSens]}
            onDragStart={(ev) => {
              setDragged(stripColName(ev.active.id.toString()))
            }}
            onDragEnd={(ev) => {
              setDragged("")
              if (ev.over && ev.active) {
                dropped.set(
                  ev.over.id.toString(),
                  stripColName(ev.active.id.toString())
                )
                // setDropped(dropped)
                setOnBox(true)
              } else {
                setOnBox(false)
              }
            }}
          >
            {/* ninja list */}
            <Row>
              <Col xl={12}>
                <ChooseNinja />
                <DragOverlay dropAnimation={{ duration: !onbox ? 500 : 0 }}>
                  {dragged ? (
                    <NinjaImage name={dragged.replaceAll("-", " ")} />
                  ) : null}
                </DragOverlay>
              </Col>
            </Row>
            <Row className="d-flex flex-column flex-md-row justify-content-evenly mt-lg-1 px-3">
              <Col xl={12}>
                <div className="bg-soft-dark-primary-3 p-3 p-md-4 me-md-2 rounded mb-2 mb-md-5"></div>
              </Col>
            </Row>
          </DndContext>
        </Container>
      </Content>
    </>
  )
}
