import Link from "next/link"
import { ReactNode } from "react"
import { Container } from "react-bootstrap"
import { MenuNav } from "./menu.component"
import Footer from './menu/footer.component';

export default function Content({ name, children }: { name?: string; children: ReactNode }) {
  return (
    <main className="bg-dark-primary">
      <MenuNav name={name} />
      <div className="min-vh-100 text-white">{children}</div>
      <Footer />
    </main>
  );
}
