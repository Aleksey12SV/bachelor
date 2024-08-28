import { axiosInstance } from "@/lib/axios";
import { Building } from "@/models/Building";
import { PaginatedData } from "@/models/PaginatedData";
import { AxiosResponse } from "axios";

export const getBuildings = (): Promise<Building[]> =>
  axiosInstance.get(`building/getAll`).then(({ data }) => data);

export const createBuilding = (
  buildingInformation: Partial<Building>
): Promise<AxiosResponse<Partial<Building>>> =>
  axiosInstance.post("building/add", buildingInformation);

export const updateBuilding = (
  buildingInformation: Partial<Building> & { id: number }
): Promise<AxiosResponse<Partial<Building>>> =>
  axiosInstance.put(`building/${buildingInformation.id}`, buildingInformation);

export const getPaginatedBuildings = (
  page: number,
  size: number
): Promise<PaginatedData<Building>> =>
  axiosInstance
    .get(`building/getAll/paginated?page=${page}&size=${size}`)
    .then(({ data }) => data);

export const deleteBuilding = (id: number): Promise<void> =>
  axiosInstance.delete(`/building/${id}`).then(({ data }) => data);
