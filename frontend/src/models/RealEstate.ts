import { Building } from "./Building";
import { PropertyType } from "./PropertyType";
import { Seller } from "./Seller";

export type RealEstate = {
  id: number;
  building: Building;
  propertyType: PropertyType;
  price: number;
  size: number;
  floor: number;
  heating: string;
  titleBG: string;
  titleEN: string;
  rooms: string;
  descriptionBG: string;
  descriptionEN: string;
  topProperty: boolean;
  publishDate: Date;
  status: string;
  sellers: Seller[];
};
