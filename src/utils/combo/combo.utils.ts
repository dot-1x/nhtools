import combos from "@/data/deploy_combos.json"
import { Combo } from "@/models/combo/combo.models"
import { comboType } from "@/types/combo.type"
import { getNinja } from "../ninja/ninja.utils"


const COMBOS = combos as comboType

export function getCombo(name: string) {
    if (!(name in COMBOS)) throw new Error(`Combo "${name}" not found`)
    const found = COMBOS[name]
    return new Combo(
        name,
        found.ninjas.map((ninja) => getNinja(ninja)),
        {
            attack: found.attack,
            defend: found.defend,
            agility: found.agility,
            hp: found.hp,
        },
        found.trigger
    )
}

export function* getAllCombo() {
    for (const [name, values] of Object.entries(COMBOS)) {
        yield new Combo(
            name,
            values.ninjas.map((ninja) => getNinja(ninja)),
            {
                attack: values.attack,
                defend: values.defend,
                agility: values.agility,
                hp: values.hp,
            },
            values.trigger
        )
    }
}

/**
 * this will search all available combo by inputted ninja
 * 
 * @param ninja array of string of ninja name
 * @returns Combo[]
 */
export function getAvailableCombo(ninja: string[]) {
    const foundCombo: Combo[] = []
    const ninjas = new Set(ninja)
    for (const ninja of ninjas) {
        const foundNinja = getNinja(ninja)
        for (const combo of foundNinja.available_combos()) {
        const founded = combo.ninjas.every(v => ninjas.has(v.name))
        if (founded && !foundCombo.some(v => v.name === combo.name)) foundCombo.push(combo)
        }
    }
    return foundCombo
}