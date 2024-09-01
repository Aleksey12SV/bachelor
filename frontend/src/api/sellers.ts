import { axiosInstance } from "@/lib/axios";
import { ExtendedSeller, Seller } from "@/models/Seller";
import { AxiosResponse } from "axios";

export const getSellers = (): Promise<Seller[]> =>
  axiosInstance.get(`seller/getAll`).then(({ data }) => data);

export const getSellersWithProperties = (): Promise<ExtendedSeller[]> =>
  axiosInstance.get(`seller/getAllWithProperties`).then(({ data }) => data);

export const createSeller = (
  seller: Partial<Seller>
): Promise<AxiosResponse<Partial<Seller>>> =>
  axiosInstance.post("seller", seller);

export const updateSeller = (
  seller: Partial<Seller> & { id: number }
): Promise<AxiosResponse<Partial<Seller>>> =>
  axiosInstance.put(`seller/${seller.id}`, seller);

export const deleteSeller = (id: number): Promise<void> =>
  axiosInstance.delete(`/seller/${id}`).then(({ data }) => data);
