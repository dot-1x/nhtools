import { Dispatch, MutableRefObject, SetStateAction } from "react"
import { Combo as CombClass } from "@/models/combo/combo.models"

export type sortStratType = "Nama" | "Attack" | "Defend" | "HP" | "Agility"
export type comboKeyData = "combo_select" | "combo_choosed"

export interface comboType {
  [name: string]: {
    attack: number
    defend: number
    hp: number
    agility: number
    trigger: boolean
    ninjas: string[]
  }
}

export interface comboAttrs {
  attack: number
  defend: number
  hp: number
  agility: number
}

export interface comboMap {
  combo_select: string[]
  combo_choosed: string[]
}

export interface arrangeData {
  active: string
  combos: comboMap
  combosKey: string
  ninjaSize: Dispatch<SetStateAction<number>>
  sortStrat: MutableRefObject<sortStratType>
}

export const sortStratMap = {
  Nama: (a: CombClass, b: CombClass) => {
    if (a.name > b.name) return 1
    if (a.name < b.name) return -1
    return 0
  },
  Attack: (a: CombClass, b: CombClass) => {
    if (a.attrs.attack > b.attrs.attack) return -1
    if (a.attrs.attack < b.attrs.attack) return 1
    return 0
  },
  Defend: (a: CombClass, b: CombClass) => {
    if (a.attrs.defend > b.attrs.defend) return -1
    if (a.attrs.defend < b.attrs.defend) return 1
    return 0
  },
  HP: (a: CombClass, b: CombClass) => {
    if (a.attrs.hp > b.attrs.hp) return -1
    if (a.attrs.hp < b.attrs.hp) return 1
    return 0
  },
  Agility: (a: CombClass, b: CombClass) => {
    if (a.attrs.agility > b.attrs.agility) return -1
    if (a.attrs.agility < b.attrs.agility) return 1
    return 0
  },
}
