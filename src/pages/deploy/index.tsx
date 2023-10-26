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

export default function Deploy() {
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
        <title>Deploy Construct</title>
      </Head>
      <Content name="Deploy">
        <Title
          title="Deploy Tool"
          bg="/assets/bg/w1.png"
          desc="Tools utility deploy seperti dalam game, untuk pengguna HP harap tekan dan tahan ninja untuk menariknya"
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
              <Col
                xl={5}
                className="bg-soft-dark-primary-3 py-4 p-md-4 my-4 my-md-0 rounded d-flex flex-column "
              >
                {/* btn  */}
                <DeployTopButton setDropped={setDropped} dropped={dropped} />

                {/* dnd ninja */}
                <DeployColumn dropped={dropped} dropstate={setDropped} />

                {/* btn  */}
                <ConectedPipe dropped={dropped} />
              </Col>

              <h2
                className="fs-1 d-block d-lg-none text-uppercase  mt-5 mt-md-5 mt-lg-0"
                style={{ letterSpacing: "1px" }}
              >
                DETAIL COMBO NINJA{" "}
              </h2>
              <Col
                xl={6}
                className={
                  "bg-soft-dark-primary-3 p-3 p-md-4 rounded d-flex flex-column justify-content-between "
                }
              >
                {/* table combo */}
                <ComboTable
                  ninjas={[...dropped.entries()].map(([_, ninja]) =>
                    ninja.replaceAll("-", " ")
                  )}
                />

                {/* att */}
                <DeployFooter dropped={dropped} />
              </Col>
            </Row>
          </DndContext>
        </Container>

        {/* <Container className="my-5 pt-2 pt-lg-4 px-4 px-md-0">
          <h2 className="fs-1 text-uppercase" style={{ letterSpacing: '1px' }}>
            DETAIL COMBO NINJA
          </h2>
          <Row>
            <Col className={'bg-soft-dark-primary-3 p-4 rounded '}>
              <ComboTable ninjas={[...dropped.entries()].map(([_, ninja]) => ninja.replaceAll('-', ' '))} />
            </Col>
          </Row>
        </Container> */}
      </Content>
    </>
  )
}
