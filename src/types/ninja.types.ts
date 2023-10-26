export interface NinjaType {
  [name: string]: {
    id: number
    attribute: string[]
    kelas: string
  }
}

export type ninjaClass = "SSS" | "SS" | "S" | "A" | "B" | "C" | "D"

export enum NinjaAttrs {
  NULL,
  BLUE,
  RED,
  GREEN,
  YELLOW,
}

export interface ninjaAttr {
  atas: NinjaAttrs
  kanan: NinjaAttrs
  bawah: NinjaAttrs
  kiri: NinjaAttrs
}
