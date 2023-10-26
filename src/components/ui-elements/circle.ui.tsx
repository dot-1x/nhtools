import { NinjaAttrs, colorRefs } from '@/types/ninja.types';
import { ReactNode } from 'react';

export default function Circle({ children, tColor, rColor, bColor, lColor }: { children: ReactNode; tColor?: NinjaAttrs; rColor?: NinjaAttrs; bColor?: NinjaAttrs; lColor?: NinjaAttrs }) {
  return (
    <>
      <div
        className="circle"
        style={{ background: `conic-gradient( ${colorRefs[tColor ? tColor : 0]} 0% 25%, ${colorRefs[rColor ? rColor : 0]} 25% 50%, ${colorRefs[bColor ? bColor : 0]} 50% 75%,  ${colorRefs[lColor ? lColor : 0]} 75% 100% )` }}
      >
        <div className="circle__border">
          <div className="circle__box">{children}</div>
        </div>
      </div>
    </>
  );
}
