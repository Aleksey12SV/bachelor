import { Building } from "./Building";
import { RealEstate } from "./RealEstate";

export type ImageRequest = {
  description?: string;
  propertyId?: number;
  buildingId?: number;
  image64: string;
  isMainImage?: boolean;
};

export type ImageResponse = {
  id: number;
  description: string;
  mainImage: boolean;
  image: string;
  realEstate?: RealEstate;
  building?: Building;
};
