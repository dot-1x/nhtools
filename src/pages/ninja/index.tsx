import Content from "@/components/content.component"
import Head from "next/head"
import Image from "next/image"
import { Card, CardGroup, Col, Container, Row, Table } from "react-bootstrap"

export default function Ninja() {
  return (
    <>
      <Head>
        <title>Ninja List</title>
      </Head>
      <Content name="Ninja">
        <Container className="p-2">
          <h3 className="text-center">Ninja tool</h3>
          <p className="text-center">This page shows all available ninjas</p>
          <Card style={{ width: "35rem" }} text="dark">
            <Card.Header>Ninja Name</Card.Header>
            <Card.Body>
              <Row>
                <Col>Class</Col>
                <Col>SSS</Col>
              </Row>
              <Row>
                <Col>Skill</Col>
                <Col>
                  <Image
                    alt="skillx"
                    src={`/assets/roleHeads/amado.png`}
                    width={30}
                    height={30}
                  />
                </Col>
              </Row>
              <Table variant="white" striped>
                <thead>
                  <tr>
                    <th>Combo Name</th>
                    <th>Ninjas</th>
                    <th>Attributes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>TESTING</td>
                    <td>TESTING</td>
                    <td>TESTING</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Container>
      </Content>
    </>
  )
}
