import { NinjaAttrs } from "@/types/ninja.types"

export default class Ninja {
    name: string
    kelas: string
    attributes: NinjaAttrs[]
    constructor(name: string, kelas: string, attributes: NinjaAttrs[]) {
        this.name = name
        this.kelas = kelas
        this.attributes = attributes
    }

    get available_combos() {
        return 1
    }
}