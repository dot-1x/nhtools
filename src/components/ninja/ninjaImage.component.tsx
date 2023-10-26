import { getNinja } from "@/utils/ninja.utils"
import Image from "next/image"
import Circle from '../ui-elements/circle.ui';

export function NinjaImage({ name, tColor, rColor, bColor, lColor }: { name: string; tColor?: number; rColor?: number; bColor?: number; lColor?: number }) {
  name = name.replaceAll('-', ' ');
  const ninja = name === 'silhouette' ? null : getNinja(name);
  return (
    <Circle tColor={tColor} rColor={rColor} bColor={bColor} lColor={lColor}>
      <Image
        alt={name}
        src={`/assets/roleHeads/${name}.png`}
        id={`image-${name.replaceAll(' ', '-')}`}
        width={65}
        height={65}
        title={`${ninja
          ?.available_combos()
          .map((c) => c.name)
          .join('\n')}`}
        // className="m-1"
      />
    </Circle>
  );
}
