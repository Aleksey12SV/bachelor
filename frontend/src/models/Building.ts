import { District } from "./District"

export type Building = {
    id: number,
    district: District,
    name: string,
    floors: number,
    year: number
}