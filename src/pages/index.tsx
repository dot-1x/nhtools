import Content from '@/components/content.component'
import Head from 'next/head'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { listPage } from '@/data/pages'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>NHTools</title>
      </Head>
      <Content>
        <Container>
          <h1 className='text-center'>NH: New Era Tools</h1>
          <p className='text-center'>Utility tools for Ninja Heroes: New Era</p>
          <Container className="border-top p-2">
            <Row lg={2} md={1} className="g-4">
              {
                listPage.map((v, i) => (
                <Col key={v.name}>
                  <Link href={`${v.href}`} style={{textDecoration: "none"}} className="text-white">
                    <Card bg="secondary" border="info">
                        <Card.Img src={`assets/card/${v.name.toLocaleLowerCase()}.png`} />
                      <Card.Header>
                        {v.name}
                      </Card.Header>
                      <Card.Body>
                        <Card.Text style={{whiteSpace: "pre-line"}}>
                          {v.desc}
                        </Card.Text>
                        </Card.Body>
                      </Card>
                  </Link>
                </Col>
                ))
              }
            </Row>
            {/* <ListGroup variant='flush'>
              {
                listPage.map(
                  (v, i) => (
                    <ListItemLink href={ v.href } key={`${i}-${v.name}`}>{ `${v.name}: ${v.desc}` }</ListItemLink>
                  )
                )
              }
            </ListGroup> */}
          </Container>
        </Container>
      </Content>
    </>
  )
}
