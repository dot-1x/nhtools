export type NinjaType = {
    [key: string]: {
        id: number
        attribute: string[]
        kelas: string
    }
}

export type ninjaClass = "SSS" | "SS" | "S" | "A" | "B" | "C" | "D"

export enum NinjaAttrs {
    BLUE,
    RED,
    GREEN,
    YELLOW
}