import Image from "next/image"


export default function NinjaImage({ name }: { name: string }) {
    return (
        <Image
            alt={ name }
            src={ `/assets/role/ImageRoles/${name}.png` }
            id={ name }
            draggable={ true }
            onClick={
                (ev) => {
                    ev.preventDefault()
                    const target = ev.currentTarget
                    console.log(target.parentElement)
                }
            }
        />
    )
}