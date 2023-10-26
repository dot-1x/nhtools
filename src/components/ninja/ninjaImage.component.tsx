import { getNinja } from "@/utils/ninja.utils"
import Image from "next/image"
import Circle from "../ui-elements/circle.ui"

export function NinjaImage({ name }: { name: string }) {
  name = name.replaceAll("-", " ")
  const ninja = name === "silhouette" ? null : getNinja(name)
  return (
    <Circle
      tColor={ninja?.attribute.atas}
      rColor={ninja?.attribute.kanan}
      bColor={ninja?.attribute.bawah}
      lColor={ninja?.attribute.kiri}
    >
      <Image
        alt={name}
        src={`/assets/roleHeads/${name}.png`}
        id={`image-${name.replaceAll(" ", "-")}`}
        width={40}
        height={40}
        title={`${ninja
          ?.available_combos()
          .map((c) => c.name)
          .join("\n")}`}
        // className="m-1"
      />
    </Circle>
  )
}
