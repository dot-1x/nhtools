import { NinjaType, NinjaAttrs } from "@/types/ninja.types"
import ninjas from "../../data/ninjas.json"
import Ninja from "@/models/ninja/ninja.models"

const NINJAS = ninjas as NinjaType

const attrMapping: { [key: string]: NinjaAttrs } = {
    "Biru": NinjaAttrs.BLUE,
    "Merah": NinjaAttrs.RED,
    "Hijau": NinjaAttrs.GREEN,
    "Kuning": NinjaAttrs.YELLOW
}

function matchRegex(name: string) {
    const pattern = name.split(" ").flatMap(
        (v) => /[a-z]/g.test(v) ?  v.toUpperCase() : [...v].map(letter => `${letter}\\w+`)
    )
    const re = new RegExp(pattern.join(" "))
    for (const key of Object.keys(NINJAS)) {
        if (re.test(key.toUpperCase())) {
            return NINJAS[key]
        }
    }
    return null
}

export function getNinja(name: string) {
    const ninja = name in NINJAS ? NINJAS[name] : matchRegex(name)
    if (!ninja) return null;

    const [atas, kanan, bawah, kiri] = ninja.attribute.map(v => attrMapping[v])
    return {
        name,
        atas: atas,
        kanan: kanan,
        bawah: bawah,
        kiri: kiri,
        kelas: ninja.kelas
    }
}

export function* getAllNinja() {
    for (const [name, value] of Object.entries(NINJAS)) {
        yield new Ninja(name, value.kelas, value.attribute.map(v => attrMapping[v]))
    }
}