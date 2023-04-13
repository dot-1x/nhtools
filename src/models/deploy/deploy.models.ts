import { getAvailableCombo } from "@/utils/combo/combo.utils";
import Ninja from "../ninja/ninja.models";

type mainNinjaType = [Ninja, Ninja, Ninja]

export class Deploy {
    ninja: Ninja[]
    main: mainNinjaType
    rows: [Ninja[], Ninja[], Ninja[]]

    constructor(main: mainNinjaType, ninja: Ninja[], row?: [Ninja[], Ninja[], Ninja[]]) {
        this.main = main
        this.ninja = ninja
        this.rows = row || [
            ninja.slice(0, 5),
            [ninja[5], ...main, ninja[6]],
            ninja.slice(7, ninja.length)
        ]
    }

    connected_pipe() {
        const topMid = this.rows[0].reduce(
            (val, ninja, idx) => {
                if (ninja.name === "null" || this.rows[1][idx].name === "null") return val
                return val + Number(ninja.attribute.bawah === this.rows[1][idx].attribute.atas)
            },
            0
        )
        const midBtm = this.rows[1].reduce(
            (val, ninja, idx) => {
                if (ninja.name === "null" || this.rows[2][idx].name === "null") return val
                return val + Number(ninja.attribute.bawah === this.rows[2][idx].attribute.atas)
            },
            0
        )
        const sides = this.rows.flatMap(
            ninjas => ninjas.reduce(
                (prev, cur, idx, arr) =>
                    prev + Number(cur.attribute.kanan === arr[idx + 1]?.attribute.kiri && cur.name !== "null"),
                0
            )
        ).reduce((p, c) => p + c)
        return topMid + midBtm + sides
    }

    combos() {
        return getAvailableCombo([...this.main, ...this.ninja].map(v => v.name))
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
            new Map(
                [
                    ["attack", 0],
                    ["defend", 0],
                    ["hp", 0],
                    ["agility", 0]
                ]
            )
        )
    }
}