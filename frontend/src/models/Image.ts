import { Building } from "./Building";
import { RealEstate } from "./RealEstate";

export type Image = {
  id: string;
  description?: string;
  mainImage?: boolean;
  image: string;
};

export type ImageRequest = Image & {
  propertyId?: number;
  buildingId?: number;
};

export type ImageResponse = Image & {
  realEstate?: RealEstate;
  building?: Building;
};
