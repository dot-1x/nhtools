import combos from "@/data/deploy_combos.json"
import { Combo } from "@/models/combo/combo.models"
import {
  comboType,
  arrangeData,
  comboKeyData,
  sortStratMap,
} from "@/types/combo.type"
import { getNinja, getNinjaByCombo } from "./ninja.utils"

const COMBOS = combos as comboType

export const stripDragID = (name: string) =>
  name.replace(/-choosed|-select/i, "")
export const getParentKey = (name: string) =>
  name.replace(/sortable-|drop-/i, "").replace("-", "_")

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

export function* getComboByNinja(ninja: string) {
  for (const combo of getAllCombo()) {
    if (combo.ninjas.some((n) => n.name === ninja)) yield combo
  }
}

/**
 * this will search all qualified combo by inputted ninja
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
      const founded = combo.ninjas.every((v) => ninjas.has(v.name))
      if (founded && !foundCombo.some((v) => v.name === combo.name))
        foundCombo.push(combo)
    }
  }
  return foundCombo
}

export function getTotalCombo(combos: Combo[]) {
  return combos.reduce(
    (prev, cur) => {
      prev.set("attack", (prev.get("attack") || 0) + cur.attrs.attack)
      prev.set("defend", (prev.get("defend") || 0) + cur.attrs.defend)
      prev.set("hp", (prev.get("hp") || 0) + cur.attrs.hp)
      prev.set("agility", (prev.get("agility") || 0) + cur.attrs.agility)
      return prev
    },
    new Map([
      ["attack", 0],
      ["defend", 0],
      ["hp", 0],
      ["agility", 0],
    ])
  )
}

export function arrangeCombo(data: arrangeData) {
  const { active, combos, combosKey, ninjaSize } = data
  if (combos.combo_choosed.includes(active))
    combos.combo_choosed.splice(combos.combo_choosed.indexOf(active), 1)
  if (combos.combo_select.includes(active))
    combos.combo_select.splice(combos.combo_select.indexOf(active), 1)
  const key = getParentKey(combosKey) as comboKeyData
  const sortFunc = sortStratMap[data.sortStrat.current]
  combos[key].push(active)
  combos[key].sort((a, b) => {
    const combA = getCombo(a)
    const combB = getCombo(b)
    return sortFunc(combA, combB)
  })
  const ninjas = getNinjaByCombo(combos.combo_choosed)
  ninjaSize(ninjas.size)
  if (ninjas.size > 15) {
    if (combos.combo_choosed.includes(active))
      combos.combo_choosed.splice(combos.combo_choosed.indexOf(active), 1)
    combos.combo_select.push(active)
    combos.combo_select.sort((a, b) => {
      const combA = getCombo(a)
      const combB = getCombo(b)
      return sortFunc(combA, combB)
    })
    setTimeout(() => ninjaSize(getNinjaByCombo(combos.combo_choosed).size), 500)
  }
}
