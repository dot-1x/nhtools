import { dropData } from "@/types/deploy.types";
import { Dispatch, SetStateAction } from "react";

export interface T_deployCol {
    dropped: dropData
    dropstate: Dispatch<SetStateAction<dropData>>
}

export interface T_dropNinja {
    id: string,
    dropped: dropData
}