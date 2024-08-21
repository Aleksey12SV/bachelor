import { axiosInstance } from "@/lib/axios";
import { Building } from "@/models/Building";
import { PaginatedData } from "@/models/PaginatedData";

export const getBuildings = (): Promise<Building[]> =>
  axiosInstance.get(`building/getAll`).then(({ data }) => data);

export const getPaginatedBuildings = (
  page: number,
  size: number
): Promise<PaginatedData<Building>> =>
  axiosInstance
    .get(`building/getAll/paginated?page=${page}&size=${size}`)
    .then(({ data }) => data);

    
export const deleteBuilding = (id: number): Promise<void> =>
  axiosInstance.delete(`/building/${id}`).then(({ data }) => data);