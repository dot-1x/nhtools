import Image from "next/image"

export function NinjaImage({ name }: { name: string }) {
  return (
    <Image
      alt={ name }
      src={`/assets/roleHeads/${name.replaceAll("-", " ")}.png`}
      id={`image-${name.replaceAll(" ", "-")}`}
      width={65}
      height={65}
    />
  )
}