import { RealEstate } from "./RealEstate";

export type Seller = {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

export type ExtendedSeller = Seller & {
  realEstates: RealEstate[];
};
