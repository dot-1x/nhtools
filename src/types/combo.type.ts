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