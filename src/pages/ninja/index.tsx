import Content from "@/components/content.component"
import Head from "next/head"
import { Card, CardGroup, Container } from "react-bootstrap"

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
        </Container>
      </Content>
    </>
  )
}
