import Content from '@/components/content.component'
import Head from 'next/head'
import { Container, ListGroup } from 'react-bootstrap'
import { ListItemLink } from '@/components/menu.component'
import { listPage } from '@/data/pages'

export default function Home() {
  return (
    <>
      <Head>
        <title>NHTools</title>
      </Head>
      <Content>
        <Container>
          <h1>NH: New Era Tools</h1>
          <p>Tools utilitas game Ninja Heroes New Era</p>
          <p>Fitur tersedia:</p>
          <Container className="border-top p-2">
            <ListGroup variant='flush'>
              {
                listPage.map(
                  (v, i) => (
                    <ListItemLink href={ v.href } key={`${i}-${v.name}`}>{ `${v.name}: ${v.desc}` }</ListItemLink>
                  )
                )
              }
            </ListGroup>
          </Container>
        </Container>
      </Content>
    </>
  )
}
