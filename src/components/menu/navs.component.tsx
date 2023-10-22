import { listPage } from "@/data/pages"
import Link from "next/link"
import { Nav, Navbar, Container, Button } from 'react-bootstrap';

export function MenuNav({ name }: { name?: string }) {
  return (
    <Navbar bg="black" variant="dark" expand="lg" className="bg-transparent">
      <Container>
        <Navbar.Brand href="#" className="teko-font fw-semibold text-primary fs-3">
          NHTools
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="Navbar-Menu" />
        <Navbar.Collapse id="Navbar-Menu">
          <div className="d-flex flex-column justify-content-center align-items-center flex-md-row space">
            <Nav className="mx-auto">
              <span className="px-3 teko-font  text-center ">
                <Link href={'/'} className={`nav-link ${name ? 'text-white' : 'text-primary'}`}>
                  Home
                </Link>
              </span>
              {listPage.map((v) => (
                <span className="px-3 teko-font  text-center " key={v.href}>
                  <Link href={v.href} className={`nav-link ${v.name === name ? 'text-white' : 'text-white'}`}>
                    {v.name}
                  </Link>
                </span>
              ))}
            </Nav>
            <Button variant="outline-primary" size="sm" className="border-2 mt-3 mt-lg-0">
              <span className=" px-4 ">DONATE</span>
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}