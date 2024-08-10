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
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const PropertyCarousel = ({ propertyId }: { propertyId: string }) => {
  const [api, setApi] = useState<CarouselApi>();

  const { data: propertyImages, isPending } = useQuery({
    queryKey: ["propertyImages", propertyId],
    queryFn: () => getPropertyImages(propertyId),
    initialData: [],
  });
  return (
    <div className="grid grid-cols-2 w-full">
      {isPending ? (
        "Loading..."
      ) : propertyImages.length ? (
        <Carousel className="flex-auto" setApi={(api) => setApi(api)}>
          <CarouselContent>
            {propertyImages.map((image, index) => (
              <CarouselItem key={image.id} onClick={() => console.log(index)}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex items-center justify-center p-6 flex-auto">
                      <span className="text-xl font-semibold w-full flex flex-col justify-center">
                        <img
                          src={`data:image/jpeg;base64,${image?.image}`}
                          alt="realtor-logo"
                          className="max-w-[800px] max-h-[400px] aspect-video"
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
          <CarouselPrevious withoutStyles />
          <CarouselNext withoutStyles />
        </Carousel>
      ) : (
        "No images found"
      )}
      <div className="flex flex-row gap-5 p-5 max-h-[400px] overflow-auto flex-wrap">
        {propertyImages.map((image, index) => (
          <img
            src={`data:image/jpeg;base64,${image?.image}`}
            alt="realtor-logo"
            className="h-20 aspect-video"
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyCarousel;
