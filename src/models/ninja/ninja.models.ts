import { NinjaAttrs } from "@/types/ninja.types"
import { getAllCombo } from "@/utils/combo/combo.utils"

export default class Ninja {
    name: string
    kelas: string
    attributes: NinjaAttrs[]
    constructor(name: string, kelas: string, attributes: NinjaAttrs[]) {
        this.name = name
        this.kelas = kelas
        this.attributes = attributes
    }

    available_combos() {
        return [...getAllCombo()].filter(v => v.ninjas.some(ninja => ninja.name === this.name))
    }
}