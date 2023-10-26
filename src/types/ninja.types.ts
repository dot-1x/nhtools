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

export const colorRefs: { [key in NinjaAttrs]: string } = {
  [NinjaAttrs.NULL]: '#ccc',
  [NinjaAttrs.BLUE]: '#0082f6',
  [NinjaAttrs.RED]: '#df0023',
  [NinjaAttrs.GREEN]: '#00d100',
  [NinjaAttrs.YELLOW]: '#dec300',
};

export interface ninjaAttr {
  atas: NinjaAttrs
  kanan: NinjaAttrs
  bawah: NinjaAttrs
  kiri: NinjaAttrs
}
