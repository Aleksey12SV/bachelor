import { getPropertyImages } from "@/api/images";
import { Image } from "@/models/Image";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

const useImages = (propertyId: number | undefined) => {
  const [images, setImages] = useState<Image[]>([]);
  const { data: propertyImages } = useQuery({
    queryKey: ["propertyImages", propertyId],
    queryFn: () => getPropertyImages(propertyId?.toString() ?? ""),
    initialData: [],
    enabled: propertyId !== undefined,
  });

  useEffect(() => {
    if (propertyId !== undefined) {
      setImages(propertyImages);
    }
  }, [propertyId, propertyImages]);

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
    oldImages: propertyImages,
    onImageAdd,
    onImageDelete,
    onImageUpdate,
  };
};

export default useImages;
