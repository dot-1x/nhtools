import { comboAttrs } from "@/types/combo.type"
import Ninja from "../ninja/ninja.models"

export class Combo {
    name: string
    ninjas: Ninja[]
    attrs: comboAttrs
    isTrigger: boolean

    constructor(name: string, ninjas: Ninja[], attrs: comboAttrs, trigger: boolean) {
        this.ninjas = ninjas
        this.name = name
        this.attrs = attrs
        this.isTrigger = trigger
    }

    get ninjasName() {
        return this.ninjas.map(v => v.name)
    }

    get attrValues() {
        return `ATK: ${this.attrs.attack} \
        DEF: ${this.attrs.defend} \
        HP: ${this.attrs.hp} \
        AGI: ${this.attrs.agility}`
    }

}