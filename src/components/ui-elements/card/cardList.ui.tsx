import { Col, Container, Row } from 'react-bootstrap';
import { listPage } from '@/data/pages';
import Link from 'next/link';

export default function CardList() {
  return (
    <section id="tools">
      <Container>
        <Row>
          <Col>
            <h2 className="fs-1 text-center pt-3 pt-md-5 pt-lg-3 mt-lg-0 mb-5">GAME TOOL‘S</h2>
            <div className="d-flex flex-wrap flex-column flex-md-row justify-content-center align-items-center">
              {listPage.map((v, i) => (
                <Link
                  key={i}
                  href={`${v.href}`}
                  style={{
                    textDecoration: 'none',
                    background: `linear-gradient(243deg, rgba(0, 0, 0, 0.16) 0%, rgba(18, 3, 63, 0.85) 100%), url(${v.img}), rgb(22, 22, 22) 50% / cover no-repeat !important`,
                    backgroundPosition: 'center',
                  }}
                  className={` card card--${i} mb-4 mb-md-3 mx-md-2 mb-lg-4 mx-lg-3`}
                >
                  <style>
                    {`
                      .card--${i}:hover {
                        background: linear-gradient(0deg, rgba(196, 176, 255, 0.966) 0%, rgba(196, 176, 255, 0.85) 100%), url(${v.img}), rgb(26, 26, 26) 50% / cover no-repeat !important;
                        background-position: center !important;
                      }
                    `}
                  </style>
                  <div className="p-4 ">
                    <span className="fw-medium">{v.shortDesc}</span>
                    <h2 className="fs-2 ">{v.name}</h2>
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
