import { NinjaAttrs, colorRefs } from "@/types/ninja.types"
import { ReactNode } from "react"

export default function Circle({
  children,
  tColor = NinjaAttrs.NULL,
  rColor = NinjaAttrs.NULL,
  bColor = NinjaAttrs.NULL,
  lColor = NinjaAttrs.NULL,
}: {
  children: ReactNode
  tColor?: NinjaAttrs
  rColor?: NinjaAttrs
  bColor?: NinjaAttrs
  lColor?: NinjaAttrs
}) {
  return (
    <>
      <div
        className="circle"
        style={{
          background: `conic-gradient( ${colorRefs[tColor]} 0% 25%, ${colorRefs[rColor]} 25% 50%, ${colorRefs[bColor]} 50% 75%,  ${colorRefs[lColor]} 75% 100% )`,
        }}
      >
        <div className="circle__border">
          <div className="circle__box">{children}</div>
        </div>
      </div>
    </>
  )
}
