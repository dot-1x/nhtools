import Content from "@/components/content.component";
import { useState } from "react";
import { Container, Dropdown, DropdownButton, Row } from "react-bootstrap";
import Head from "next/head";
import { ChooseContainer } from "@/components/ninja/ninja.component";
import { DeployColumn } from "@/components/deploy/deploy.component";
import { DndContext } from "@dnd-kit/core";

export default function Deploy() {
  const [CHOOSED, setChoosed] = useState("SSS")
  const [dragged, setDragged] = useState("")
  const [dropped, setDropped] = useState([""])

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
            onDragStart={(ev) => { setDragged(ev.active.id.toString()) }}
            onDragEnd={
              (ev) => {
                setDragged("")
                dropped.push(ev.over?.id as string)
                setDropped(dropped)
                console.log(ev.active?.id)
              }
            }
          >
            {
              CHOOSED && <ChooseContainer choosed={CHOOSED} dragged={dragged} />
            }
            <Row>
              <DeployColumn dropped={dropped} dropstate={setDropped} />
            </Row>
          </DndContext>
        </Container>
      </Content>
    </>
  )
}