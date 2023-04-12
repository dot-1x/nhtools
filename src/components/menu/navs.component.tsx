import { listPage } from "@/data/pages"
import Link from "next/link"
import { Nav, Navbar, Container } from "react-bootstrap"

export function MenuNav({ name }: {name?: string}) {
  return (
    <Navbar bg="black" variant="dark" expand='lg'>
      <Container fluid>
        <Navbar.Brand href="#">NHTools</Navbar.Brand>
        <Navbar.Toggle aria-controls="Navbar-Menu" />
        <Navbar.Collapse id="Navbar-Menu">
          <Nav className="me-auto">
            <span><Link href={"/"} className={`nav-link ${name ? "" : "text-white"}`}>Home</Link></span>
            {
              listPage.map(
                v => (<span key={v.href}><Link href={v.href} className={`nav-link ${v.name === name ? 'text-white' : ''}`}>{v.name}</Link></span>)
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}