import Link from "next/link"
import { Button, Col, Container, Row } from "react-bootstrap"
import { Image } from "react-bootstrap"

export default function Header() {
  return (
    <section className="header px-3 px-md-0">
      <Container>
        <Row className="d-flex flex-column flex-lg-row justify-content-lg-between   ">
          <Col className="my-3 align-self-end">
            <h1>
              NH <span>NEW ERA TOOL’S</span>
            </h1>
            <p>Utility tools for NH: New Era game</p>
            <div className="w-auto d-flex flex-row mt-5">
              <Link href={"/#tools"} className="text-decoration-none">
                <Button variant="primary" className="border-2  mb-5 me-3 ">
                  <span className=" px-4 px-lg-5 text-capitalize fs-5 fw-semibold">
                    GET STARTED
                  </span>
                </Button>
              </Link>
              <Link
                href={"https://www.ninjaheroesnewera.com/"}
                className="text-decoration-none"
                target="_blank"
              >
                <Button
                  variant="outline-primary"
                  className="border-2  mb-5 me-3 d-none d-md-block"
                >
                  <span className=" px-4 px-lg-5  fs-5 fw-semibold">
                    INSTALL GAME
                  </span>
                </Button>
              </Link>
            </div>
          </Col>
          <Col className="my-3  d-none d-lg-block align-self-start">
            <Image src="/assets/sasuke.png" alt="sasuke" width={470} />
          </Col>
        </Row>
      </Container>
    </section>
  )
}
