import { Building } from "./Building";
import { RealEstate } from "./RealEstate";

export type Image = {
  id: string;
  descriptionBG?: string;
  descriptionEN?: string;
  mainImage?: boolean;
  image: string;
  height?: number;
  width?: number;
};

export type ImageRequest = Image & {
  propertyId?: number;
  buildingId?: number;
};

export type ImageResponse = Image & {
  realEstate?: RealEstate;
  building?: Building;
};
