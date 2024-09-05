import { getBuildingImages, getPropertyImages } from "@/api/images";
import { imageQueryKeys } from "@/components/utils/queryFactory";
import { Image } from "@/models/Image";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

const useImages = (id: number | undefined, imageType: string) => {
  const [images, setImages] = useState<Image[]>([]);
  const { data: fetchedImages } = useQuery({
    queryKey:
      imageType === "propertyImages"
        ? imageQueryKeys.allRealEstateImages(id ?? -1)
        : imageQueryKeys.allBuildingImages(id ?? -1),
    queryFn: () =>
      imageType === "propertyImages"
        ? getPropertyImages(id?.toString() ?? "")
        : getBuildingImages(id?.toString() ?? ""),
    initialData: [],
    enabled: id !== undefined,
  });

  useEffect(() => {
    if (id !== undefined) {
      setImages(fetchedImages);
    }
  }, [id, fetchedImages]);

  const onImageAdd = useCallback(
    (image: Image) => setImages([...images, image]),
    [images]
  );
  const onImageDelete = useCallback(
    (image: Image) => setImages(images.filter((i) => i.id !== image.id)),
    [images]
  );
  const onImageUpdate = useCallback(
    (image: Image) =>
      setImages(
        images.map((i) => (i.id === image.id ? { ...i, ...image } : i))
      ),
    [images]
  );

  return {
    images,
    oldImages: fetchedImages,
    onImageAdd,
    onImageDelete,
    onImageUpdate,
  };
};

export default useImages;
