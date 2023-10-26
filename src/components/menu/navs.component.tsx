import { listPage } from "@/data/pages"
import Link from "next/link"
import { Nav, Navbar, Container, Button } from 'react-bootstrap';

export function MenuNav({ name }: { name?: string }) {
  return (
    <Navbar bg="black" variant="dark" expand="lg" className=" bg-transparent z-3 ">
      <Container>
        <Navbar.Brand href="/" className="teko-font  text-primary fs-2 fw-semibold ">
          NHTools
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="Navbar-Menu" />
        <Navbar.Collapse id="Navbar-Menu" className="flex flex-lg-row justify-content-between">
          <Nav className="mx-auto pb-5 pb-lg-0">
            <span className="px-3 teko-font text-uppercase fst-italic  text-center fs-5">
              <Link href={'/'} className={`nav-link ${name ? 'text-white' : 'text-primary'}`}>
                Home
              </Link>
            </span>
            {listPage.map((v) => (
              <span className="px-3 teko-font text-uppercase fst-italic  text-center fs-5" key={v.href}>
                <Link href={v.href} className={`nav-link ${v.name === name ? 'text-primary' : 'text-white'}`}>
                  {v.name}
                </Link>
              </span>
            ))}
            <Button variant="outline-primary" size="sm" className="border-2 mt-3 mt-lg-0 w-50 mx-auto rounded d-lg-none mb-5">
              <span className=" px-4 fs-5 ">DONATE</span>
            </Button>
          </Nav>
          {/* </div> */}
        </Navbar.Collapse>
        <Button variant="outline-primary" className="border-2 mt-3 mt-lg-0 mx-auto rounded d-none d-lg-block">
          <span className=" px-4 fs-6 fw-semibold">DONATE</span>
        </Button>
      </Container>
    </Navbar>
  );
}