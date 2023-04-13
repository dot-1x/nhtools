import { getNinja } from "@/utils/ninja/ninja.utils"
import Image from "next/image"

export function NinjaImage({ name }: { name: string }) {
  name = name.replaceAll("-", " ")
  const ninja = name === "silhouette" ? null : getNinja(name)
  return (
    <Image
      alt={name}
      src={`/assets/roleHeads/${name}.png`}
      id={`image-${name.replaceAll(" ", "-")}`}
      width={65}
      height={65}
      title={`${ninja?.available_combos().map(c => c.name).join("\n")}`}
      // className="m-1"
    />
  )
}