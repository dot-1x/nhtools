import { NinjaAttrs, ninjaAttr } from "@/types/ninja.types"
import { getComboByNinja } from "@/utils/combo.utils"

export default class Ninja {
  name: string
  kelas: string
  attributes: NinjaAttrs[]
  attribute: ninjaAttr

  constructor(
    name: string,
    kelas: string,
    attributes: NinjaAttrs[],
    attribute: ninjaAttr
  ) {
    this.name = name
    this.kelas = kelas
    this.attributes = attributes
    this.attribute = attribute
  }

  available_combos() {
    return [...getComboByNinja(this.name)]
  }
}
