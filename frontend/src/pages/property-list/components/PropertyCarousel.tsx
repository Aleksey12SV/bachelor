import { getPropertyImages } from "@/api/images";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { imageQueryKeys } from "@/components/utils/queryFactory";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import { useTranslation } from "react-i18next";

const THUMBNAIL_COUNT = 5;

const PropertyCarousel = ({ propertyId }: { propertyId: string }) => {
  const {
    i18n: { language },
  } = useTranslation();
  const [api, setApi] = useState<CarouselApi>();
  const [imageIndex, setImageIndex] = useState(0);
  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState(-1);
  const { data: propertyImages, isPending } = useQuery({
    queryKey: imageQueryKeys.allRealEstateImages(Number(propertyId)),
    queryFn: () => getPropertyImages(propertyId),
    initialData: [],
  });
  const photos = useMemo(
    () =>
      propertyImages.map((i, index) => {
        const height = i.height ?? 1;
        const width = i.width ?? 1;
        return {
          src: "data:image/jpeg;base64," + i.image,
          height: height,
          width: width,
          key: index.toString(),
          title: language === "en" ? i.descriptionEN : i.descriptionBG,
        };
      }),
    [propertyImages, language]
  );
  const getVisibleThumbnails = () => {
    if (imageIndex < 4) {
      // Case 1: If currentIndex is between 0 and 4, show the first 5 thumbnails
      return propertyImages.slice(0, THUMBNAIL_COUNT);
    } else if (imageIndex >= propertyImages.length - 2) {
      // Case 3: If currentIndex is near the end, show the last 5 thumbnails
      return propertyImages.slice(propertyImages.length - THUMBNAIL_COUNT);
    } else {
      // Case 2: Center the current index if it's in the middle
      return propertyImages.slice(imageIndex - 2, imageIndex + 3);
    }
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-row w-full pt-2 overflow-hidden">
        {isPending ? (
          "Loading..."
        ) : propertyImages.length ? (
          <Carousel
            opts={{ loop: false }}
            className="flex flex-row items-center gap-1 overflow-hidden"
            setApi={(api) => setApi(api)}
          >
            <CarouselPrevious
              withoutStyles
              clickCallback={() => {
                const newIndex = imageIndex - 1;
                if (newIndex < 0) return;
                setImageIndex(newIndex);
              }}
            />
            <CarouselContent className="cursor-pointer">
              {propertyImages.map((image, index) => (
                <CarouselItem
                  key={image.id}
                  onClick={() => setLightboxPhotoIndex(index)}
                >
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex items-center justify-center p-6 flex-auto">
                        <span className="text-xl font-semibold w-full flex flex-col justify-center">
                          <img
                            src={`data:image/jpeg;base64,${image?.image}`}
                            alt="realtor-logo"
                            className="max-w-[800px] max-h-[400px] object-contain"
                          />
                          <span className="flex w-full justify-end pt-2">
                            {index + 1}/{propertyImages.length}
                          </span>
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext
              clickCallback={() => {
                const newIndex = imageIndex + 1;
                if (newIndex < 0) return;
                setImageIndex(newIndex);
              }}
              withoutStyles
            />
          </Carousel>
        ) : null}
        {propertyImages.length ? (
          <div className="grid grid-rows-5 gap-5 p-5 min-w-[150px] max-w-[150px] overflow-hidden">
            {getVisibleThumbnails().map((image, index) => (
              <div className="flex items-center border p-2 rounded">
                <img
                  key={image.id}
                  src={`data:image/jpeg;base64,${image?.image}`}
                  alt="realtor-logo"
                  className="object-fit"
                  onClick={() => api?.scrollTo(index)}
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <Lightbox
        open={lightboxPhotoIndex >= 0}
        close={() => setLightboxPhotoIndex(-1)}
        slides={photos}
        index={lightboxPhotoIndex}
        styles={{ root: { "--yarl__color_backdrop": "rgba(0, 0, 0, .8)" } }}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom, Captions]}
      />
    </div>
  );
};

export default PropertyCarousel;
