import { getAvailableCombo } from "@/utils/combo.utils"
import Ninja from "../ninja/ninja.models"

type mainNinjaType = [Ninja, Ninja, Ninja]

export class Deploy {
  ninja: Ninja[]
  main: mainNinjaType
  rows: [Ninja[], Ninja[], Ninja[]]

  constructor(
    main: mainNinjaType,
    ninja: Ninja[],
    row?: [Ninja[], Ninja[], Ninja[]]
  ) {
    this.main = main
    this.ninja = ninja
    this.rows = row || [
      ninja.slice(0, 5),
      [ninja[5], ...main, ninja[6]],
      ninja.slice(7, ninja.length),
    ]
  }

  connected_pipe() {
    let counter = 0
    for (let index = 0; index < this.rows[0].length; index++) {
      const top = this.rows[0][index]
      const mid = this.rows[1][index]
      const bottom = this.rows[2][index]
      if (
        top.attribute.bawah === mid.attribute.atas &&
        (top.name !== "null" || mid.name !== "null")
      )
        counter += 1
      if (
        mid.attribute.bawah === bottom.attribute.atas &&
        (mid.name !== "null" || bottom.name !== "null")
      )
        counter += 1
    }
    const sides = this.rows
      .flatMap((ninjas) =>
        ninjas.reduce(
          (prev, cur, idx, arr) =>
            prev +
            Number(
              cur.attribute.kanan === arr[idx + 1]?.attribute.kiri &&
                cur.name !== "null"
            ),
          0
        )
      )
      .reduce((p, c) => p + c)
    return sides + counter
    // return topMid + midBtm + sides
  }

  combos() {
    return getAvailableCombo([...this.main, ...this.ninja].map((v) => v.name))
  }

  totalCombo() {
    return this.combos().reduce(
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

  toString() {
    return `[${this.rows[0].map((v) => `"${v.name}"`)}],\n[${this.rows[1].map(
      (v) => `"${v.name}"`
    )}],\n[${this.rows[2].map((v) => `"${v.name}"`)}]`
  }
}
