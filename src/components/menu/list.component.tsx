import Link from "next/link"
import { ReactNode } from "react"

export function ListItemLink({ href, children }: { href: string, children: ReactNode }) {
  return (
    <Link href={href} className='list-group-item list-group-item-action bg-dark text-white'>{children}</Link>
  )
}