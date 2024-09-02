import { axiosInstance } from "@/lib/axios";
import { ImageRequest, ImageResponse } from "@/models/Image";
import { PaginatedData } from "@/models/PaginatedData";

export const getImages = (): Promise<ImageResponse[]> =>
  axiosInstance.get("image/getAll").then(({ data }) => data);

export const getTopImages = (): Promise<ImageResponse[]> =>
  axiosInstance.get("image/getTopImages").then(({ data }) => data);

export const createImage = (imageInformation: Partial<ImageRequest>) =>
  (imageInformation.propertyId || imageInformation.buildingId) &&
  axiosInstance.post("image/add", imageInformation);

export const updateImage = (imageInformation: Partial<ImageRequest>) =>
  axiosInstance.put("image", imageInformation);

export const getPropertyImages = (
  propertyId: string
): Promise<ImageResponse[]> =>
  axiosInstance
    .get(`image/getAll/property/${propertyId}`)
    .then(({ data }) => data);

export const getBuildingImages = (
  buildingId: string
): Promise<ImageResponse[]> =>
  axiosInstance
    .get(`image/getAll/building/${buildingId}`)
    .then(({ data }) => data);

export const getPaginatedImages = (
  page: number,
  size: number
): Promise<PaginatedData<ImageResponse>> =>
  axiosInstance
    .get(`image/getAll/paginated?page=${page}&size=${size}`)
    .then(({ data }) => data);

export const getMainImageForProperty = (id: number): Promise<ImageResponse> =>
  axiosInstance.get(`image/main/real-estate/${id}`).then(({ data }) => data);

export const deleteImage = (imageId: string): Promise<void> =>
  axiosInstance.delete(`image/${imageId}`);
