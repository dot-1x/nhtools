import Link from "next/link"
import { Button, Col, Container, Row } from "react-bootstrap"
import { Image } from "react-bootstrap"

export default function Title({
  title,
  desc,
  bg,
}: {
  title?: string
  desc?: string
  bg?: string
}) {
  return (
    <section
      className="title px-3 px-md-0"
      style={{
        textDecoration: "none",
        background: `linear-gradient(180deg, rgba(7, 3, 17, 0.74) 0%, #070311 100%), url(${bg}), lightgray 50% / cover no-repeat `,
      }}
    >
      <Container>
        <Row className="d-flex flex-column flex-lg-row justify-content-lg-between   ">
          <Col className="my-3 align-self-end">
            <h1 className="text-uppercase">{title}</h1>
            <p>{desc}</p>
            <div className="w-auto d-flex flex-row mt-5">
              <Link href={"#"} className="text-decoration-none">
                <Button variant="primary" className="border-2  mb-5 me-3 ">
                  <span className=" px-4 px-lg-5 text-capitalize fs-5 fw-semibold">
                    VIDEO TUTORIAL
                  </span>
                </Button>
              </Link>
              <Link
                href={"https://sociabuzz.com/dotcchix"}
                className="text-decoration-none"
                target="_blank"
              >
                <Button
                  variant="outline-primary"
                  className="border-2  mb-5 me-3 d-none d-md-block"
                >
                  <span className=" px-4 px-lg-5  fs-5 fw-semibold">
                    DONATE
                  </span>
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
