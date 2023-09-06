import { NinjaType, NinjaAttrs } from "@/types/ninja.types"
import ninjas from "../data/ninjas.json"
import Ninja from "@/models/ninja/ninja.models"
import { Combo } from "@/models/combo/combo.models"
import { getCombo } from "./combo.utils"

const NINJAS = ninjas as NinjaType

const DEFAULT = new Ninja(
  "null",
  "null",
  [NinjaAttrs.NULL, NinjaAttrs.NULL, NinjaAttrs.NULL, NinjaAttrs.NULL],
  {
    atas: NinjaAttrs.NULL,
    kanan: NinjaAttrs.NULL,
    bawah: NinjaAttrs.NULL,
    kiri: NinjaAttrs.NULL,
  }
)

const attrMapping: { [key: string]: NinjaAttrs } = {
  Biru: NinjaAttrs.BLUE,
  Merah: NinjaAttrs.RED,
  Hijau: NinjaAttrs.GREEN,
  Kuning: NinjaAttrs.YELLOW,
}

function matchRegex(name: string) {
  const pattern = name
    .split(" ")
    .flatMap((v) =>
      /[a-z]/g.test(v)
        ? v.toUpperCase()
        : [...v].map((letter) => `${letter}\\w+`)
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
  if (!name) return DEFAULT
  const ninja = name in NINJAS ? NINJAS[name] : matchRegex(name)
  if (!ninja) return DEFAULT

  const [atas, kanan, bawah, kiri] = ninja.attribute.map((v) => attrMapping[v])
  return new Ninja(name, ninja.kelas, [atas, kanan, bawah, kiri], {
    atas: atas,
    kanan: kanan,
    bawah: bawah,
    kiri: kiri,
  })
}

export function getNinjas(names: string[]) {
  return names.map((v) => getNinja(v))
}

export function* getAllNinja() {
  for (const name of Object.keys(NINJAS)) {
    yield getNinja(name)
  }
}

export function stripColName(name: string) {
  const re = /col-\d-row-\d-/i
  return name.replace(re, "")
}

export function getNinjaByCombo(combos: string[]) {
  const combs = combos.map((v) => getCombo(v))
  return new Set(combs.flatMap((v) => v.ninjasName))
}

export function* getNinjaByClass(
  kelas: "UR" | "SSS" | "SS" | "S" | "A" | "B" | "C" | "D"
) {
  for (const ninja of getAllNinja()) {
    if (ninja.kelas === kelas) yield ninja
  }
}
