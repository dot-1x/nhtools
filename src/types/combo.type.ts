import { Dispatch, SetStateAction } from "react"

export type comboKeyData = "combo_select" | "combo_choosed"

export interface comboType {
    [name: string]: {
        "attack": number
        "defend": number
        "hp": number
        "agility": number
        "trigger": boolean
        "ninjas": string[]
    }
}

export interface comboAttrs {
    "attack": number
    "defend": number
    "hp": number
    "agility": number
}

export interface comboMap {
    combo_select: string[]
    combo_choosed: string[]
}

export interface arrangeData {
    active: string,
    combos: comboMap,
    combosKey: string,
    ninjaSize: Dispatch<SetStateAction<number>>
}
