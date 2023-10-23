import { Col, Container, Row } from 'react-bootstrap';
import { listPage } from '@/data/pages';
import Link from 'next/link';

export default function CardList() {
  return (
    <section className="">
      <Container>
        <Row>
          <Col>
            <h2 className="fs-1 text-center mt-5 mt-lg-0 mb-5">GAME TOOL‘S</h2>
            <div className="d-flex flex-wrap flex-column flex-md-row justify-content-center align-items-center">
              {listPage.map((v, i) => (
                <Link key={i} href={`${v.href}`} style={{ textDecoration: 'none' }} className=" __card mb-4 mb-md-3 mx-md-2 mb-lg-4 mx-lg-3">
                  <div className="p-4 ">
                    <span className="fw-medium">{v.shortDesc}</span>
                    <h2 className="fs-2 fs">{v.name}</h2>
                    <p className="fw-semibold">{v.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
