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
        let connected = 0
        const row1 = this.rows[0]
        const row2 = this.rows[1]
        const row3 = this.rows[2]
        for (let index = 0; index < 5; index++) {
            const upmid = row1[index].attribute.bawah === row2[index].attribute.atas && row1[index].name !== "null"
            const downmid = row2[index].attribute.bawah === row3[index].attribute.atas && row1[index].name !== "null"

            // const r1 = row1[index] === row1[index + 1]
            // const r2 = row2[index] === row2[index + 1]
            // const r3 = row3[index] === row3[index + 1]
            connected += [upmid, downmid].filter(v => v).length
        }
        // using flatmap
        const checks = this.rows.flatMap(
            ninjas => ninjas.map(
                (ninja, idx, arr) =>
                    ninja.attribute.kanan === arr[idx + 1]?.attribute.kiri && ninja.name !== "null"
            )
        ).filter(v => v).length
        connected += checks
        return connected
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