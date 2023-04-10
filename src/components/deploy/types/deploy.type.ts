import { Dispatch, SetStateAction } from "react";

export interface T_deployCol {
    dropped: string[]
    dropstate: Dispatch<SetStateAction<string[]>>
}

export interface T_dropNinja {
    id: string,
    dropped: string[],
    lastDrop?: string
}