import { axiosInstance } from "@/lib/axios";
import { Seller } from "@/models/Seller";

export const getSellers = (): Promise<Seller[]> =>
    axiosInstance.get(`seller/getAll`).then(({ data }) => data);