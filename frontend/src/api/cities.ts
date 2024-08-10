import { axiosInstance } from "@/lib/axios";
import { City } from "@/models/City";

export const getCities = (): Promise<City[]> =>
    axiosInstance.get("city/getAll").then(({ data }) => data);