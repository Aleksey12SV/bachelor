import { axiosInstance } from "@/lib/axios";
import { RealEstate } from "@/models/RealEstate";
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

export const deleteRealEstate = (id: number): Promise<void> =>
  axiosInstance.delete(`/real-estate/${id}`).then(({ data }) => data);
