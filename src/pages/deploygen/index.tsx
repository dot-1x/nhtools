import Content from "@/components/content.component"
import Head from "next/head"
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownButton,
  Button,
  Form,
  FormText,
  ButtonGroup,
} from "react-bootstrap"
import Title from "@/components/ui-elements/title.ui"
import { NinjaImage } from "@/components/ninja.component"
import { getNinjaByClass } from "@/utils/ninja.utils"
import { useState } from "react"
import { ninjaClass } from "@/types/ninja.types"

interface attribs {
  attack: number
  defend: number
  hp: number
  agility: number
}
export default function DeployGen() {
  const [selectedClass, setClass] = useState<ninjaClass>("SSS")
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [attributes, setAttribute] = useState<attribs>({
    attack: 0,
    defend: 0,
    hp: 0,
    agility: 0,
  })
  const [DeployName, setDeployName] = useState("")
  const data = {
    id: 0,
    ...attributes,
    trigger: false,
    ninjas: [...selected],
  }
  return (
    <>
      <Head>
        <title>Deploy Generator</title>
      </Head>
      <Content name="Deploy">
        <Title
          title="Deploy Generator Tool"
          bg="/assets/bg/w1.png"
          desc="Convert selected ninjas to JSON"
        />
        <Container className="bg-dark-primary ">
          <Row className="d-flex flex-column flex-md-row justify-content-evenly mt-lg-1 px-3">
            <Col xl={12}>
              <div className="bg-soft-dark-primary-3 p-3 p-md-4 me-md-2 rounded mb-2 mb-md-5">
                <div className="d-flex flex-row">
                  <DropdownButton title="Choose Ninja" className="mb-4">
                    {["UR", "SSS", "SS", "S", "A", "B", "C", "D"].map((v) => (
                      <Dropdown.Item
                        key={v}
                        id={v}
                        onClick={(ev) =>
                          setClass(ev.currentTarget.id as ninjaClass)
                        }
                      >
                        {v}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                  <Button
                    variant="danger"
                    className="m-1"
                    onClick={(_) => {
                      setSelected(new Set())
                      setDeployName("")
                    }}
                  >
                    Reset
                  </Button>
                </div>
                <div
                  className="overflow-x-auto overflow-y-hidden p-1 d-flex flex-row pb-4 "
                  onScroll={(ev) => {
                    ev.preventDefault()
                  }}
                >
                  {[...getNinjaByClass(selectedClass)].map((v) => (
                    <Button
                      className={`mx-2 btn ${
                        selected.has(v.name) ? "btn-success" : "btn-primary"
                      }`}
                      id={v.name}
                      key={v.name}
                      onClick={(ev) => {
                        if (selected.has(ev.currentTarget.id)) {
                          selected.delete(ev.currentTarget.id)
                        } else {
                          selected.add(ev.currentTarget.id)
                        }
                        setSelected(new Set(selected))
                        // ev.currentTarget.classList.remove("btn-primary")
                        // ev.currentTarget.classList.add("btn-success")
                      }}
                    >
                      <NinjaImage key={v.name} name={v.name} />
                    </Button>
                  ))}
                </div>
                <Row className="p-2">
                  <Col>
                    <button className="btn btn-primary">Name: </button>
                  </Col>
                  <Col>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(ev) => {
                        setDeployName(ev.currentTarget.value)
                      }}
                    />
                  </Col>
                  <Col>
                    <button className="btn btn-primary">Attack: </button>
                  </Col>
                  <Col>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={0}
                      onChange={(ev) => {
                        attributes.attack = parseInt(ev.currentTarget.value)
                        setAttribute({ ...attributes })
                      }}
                    />
                  </Col>
                  <Col>
                    <button className="btn btn-primary">Defense: </button>
                  </Col>
                  <Col>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={0}
                      onChange={(ev) => {
                        attributes.defend = parseInt(ev.currentTarget.value)
                        setAttribute({ ...attributes })
                      }}
                    />
                  </Col>
                  <Col>
                    <button className="btn btn-primary">HP: </button>
                  </Col>
                  <Col>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={0}
                      onChange={(ev) => {
                        attributes.hp = parseInt(ev.currentTarget.value)
                        setAttribute({ ...attributes })
                      }}
                    />
                  </Col>
                  <Col>
                    <button className="btn btn-primary">Agility: </button>
                  </Col>
                  <Col>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={0}
                      onChange={(ev) => {
                        attributes.agility = parseInt(ev.currentTarget.value)
                        setAttribute({ ...attributes })
                      }}
                    />
                  </Col>
                </Row>
              </div>
              <div className="bg-soft-dark-primary-3 p-3 p-md-4 me-md-2 rounded mb-2 mb-md-5">
                "{DeployName}":{JSON.stringify(data, undefined, 2)}
              </div>
            </Col>
          </Row>
        </Container>
      </Content>
    </>
  )
}
