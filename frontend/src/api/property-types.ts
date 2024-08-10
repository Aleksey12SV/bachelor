import { axiosInstance } from "@/lib/axios";
import { PropertyType } from "@/models/PropertyType";

export const getPropertyTypes = (): Promise<PropertyType[]> =>
  axiosInstance.get("property-type/getAll").then(({ data }) => data);
