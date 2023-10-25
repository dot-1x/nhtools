import Link from 'next/link';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Image } from 'react-bootstrap';

export default function Donate() {
  return (
    <section className="my-2 my-lg-5  pt-0 pt-lg-3 donate">
      <Container>
        <Row className="d-flex flex-column flex-lg-row justify-content-lg-center   ">
          <Col className="my-3 align-self-center donate__image">
            <Image src="/assets/bg/w1.png" alt="sasuke" width={470} className="align-items-start" />
            <div>
              <Image src="/assets/bg/w9.png" alt="sasuke" width={470} className="align-items-end" />
            </div>
          </Col>
          <Col className="my-3   d-lg-block align-self-center">
            <h2 className="fs-1">DONATE TO SUPPORT</h2>
            <p>Mempunyai pengertian setiap baris data pada tabel pertama dihubungkan hanya ke satu baris data pada tabel ke dua. Hubungan antara file pertama dan file kedua adalah satu satu. Hubungan antara file Hubungan .</p>
            <div className="w-auto d-flex flex-row mt-5">
              <Link href={'https://teer.id/dotcchi1x'} className="text-decoration-none" target="_blank">
                <Button variant="primary" className="border-2  mb-5 me-3">
                  <span className=" px-4 px-lg-5 text-capitalize fs-5 fw-semibold ">DONATE ME</span>
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}