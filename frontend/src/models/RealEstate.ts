import { Building } from "./Building"
import { PropertyType } from "./PropertyType"

export type RealEstate = {
    id: number,
    building: Building,
    propertyType: PropertyType
    price: number,
    size: number,
}