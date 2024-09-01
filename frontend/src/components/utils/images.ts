import { createImage, deleteImage, updateImage } from "@/api/images";
import { ImageResponse } from "@/models/Image";

export const handleImageChanges = async ({
  images,
  oldImages,
  propertyId,
  buildingId,
}: {
  images: ImageResponse[];
  oldImages: ImageResponse[];
  propertyId?: number;
  buildingId?: number;
}) => {
  const imagesToDelete = oldImages.filter(
    (oldImage) => !images.some((image) => image.id === oldImage.id)
  );
  const imagesToAdd = images
    .filter((i) => i.image)
    .filter((image) => !oldImages.some((oldImage) => image.id === oldImage.id));
  const imagesToUpdate = images.filter((image) => {
    const oldImage = oldImages.find((oldImage) => oldImage.id === image.id);
    return (
      oldImage &&
      (oldImage.descriptionBG !== image.descriptionBG ||
        oldImage.descriptionEN !== image.descriptionEN ||
        oldImage.mainImage !== image.mainImage)
    );
  });

  return Promise.all([
    ...imagesToAdd.map((image) =>
      createImage({
        ...image,
        propertyId,
        buildingId,
      })
    ),
    ...imagesToDelete.map((image) => deleteImage(image.id)),
    ...imagesToUpdate.map((image) => updateImage(image)),
  ]);
};
