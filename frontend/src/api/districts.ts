import { axiosInstance } from "@/lib/axios";
import { District } from "@/models/District";

export const getDistrictsByCityId = (cityId: number): Promise<District[]> =>
  axiosInstance.get(`district/${cityId}/district`).then(({ data }) => data);
