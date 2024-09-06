import { axiosInstance } from "@/lib/axios";
import { PaginatedData } from "@/models/PaginatedData";
import { RealEstate } from "@/models/RealEstate";
import { FormType } from "@/models/RealEstateForm";
import { AxiosResponse } from "axios";

export const createRealEstate = (
  propertyInformation: Partial<RealEstate>
): Promise<AxiosResponse<Partial<RealEstate>>> =>
  axiosInstance.post("real-estate", propertyInformation);

export const updateRealEstate = (
  propertyInformation: Partial<RealEstate> & { id: number }
): Promise<AxiosResponse<Partial<RealEstate>>> =>
  axiosInstance.put(
    `real-estate/${propertyInformation.id}`,
    propertyInformation
  );

export const getRealEstateById = (realEstateId: string): Promise<RealEstate> =>
  axiosInstance.get(`real-estate/${realEstateId}`).then(({ data }) => data);

export const getFilteredRealEstates = (
  filters: Partial<FormType & { page: number; size: number }>
): Promise<PaginatedData<RealEstate>> =>
  axiosInstance.post(`real-estate/filtered`, filters).then(({ data }) => data);

export const deleteRealEstate = (id: number): Promise<void> =>
  axiosInstance.delete(`/real-estate/${id}`).then(({ data }) => data);
