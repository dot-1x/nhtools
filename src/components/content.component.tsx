import Link from "next/link"
import { ReactNode } from "react"
import { Container } from "react-bootstrap"
import { MenuNav } from "./menu.component"
import Footer from './elements/footer.component';

export default function Content({
  name,
  children,
}: {
  name?: string
  children: ReactNode
}) {
  return (
    <main className="bg-dark-primary">
      <MenuNav name={name} />
      <Container fluid className="bg-dark text-white">
        {children}
      </Container>
      <Footer />
    </main>
  );
}
