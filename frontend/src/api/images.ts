import { axiosInstance } from "@/lib/axios";
import { ImageRequest, ImageResponse } from "@/models/Image";

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

export const getImagesForId = (id: number): Promise<ImageResponse[]> =>
  axiosInstance.get(`image/getAll/${id}`).then(({ data }) => data);

export const getMainImageForProperty = (id: number): Promise<ImageResponse> =>
  axiosInstance.get(`image/main/real-estate/${id}`).then(({ data }) => data);

export const deleteImage = (imageId: string): Promise<void> =>
  axiosInstance.delete(`image/${imageId}`);
