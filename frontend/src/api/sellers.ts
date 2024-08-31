import { axiosInstance } from "@/lib/axios";
import { RealEstate } from "@/models/RealEstate";
import { Seller } from "@/models/Seller";

export const getSellers = (): Promise<Seller[]> =>
  axiosInstance.get(`seller/getAll`).then(({ data }) => data);

export const getSellersWithProperties = (): Promise<
  (Seller & { realEstates: RealEstate[] })[]
> => axiosInstance.get(`seller/getAllWithProperties`).then(({ data }) => data);
