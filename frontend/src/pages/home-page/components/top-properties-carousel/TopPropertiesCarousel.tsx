import { getTopImages } from "@/api/images";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const TopPropertiesCarousel = () => {
  const { t } = useTranslation();
  const { data: images } = useQuery({
    queryKey: ["images"],
    queryFn: getTopImages,
    initialData: [],
  });
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const IMAGES_LENGTH = images.length > 5 ? 5 : images.length;
  const navigate = useNavigate();
  return (
    <div className="w-full h-[25rem] flex justify-center pt-2 px-6">
      <div className="w-[40rem] flex flex-col">
        <span className="p-1 font-bold">{t("topProperties")}</span>
        <Carousel
          plugins={[plugin.current]}
          className="flex-auto"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.play}
        >
          <CarouselContent>
            {Array.from({ length: IMAGES_LENGTH }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent
                      className="flex items-center justify-center p-6 flex-auto w-full min-h-[22rem] cursor-pointer"
                      onClick={() =>
                        navigate(
                          `/property-list/${images[index].realEstate?.id}`
                        )
                      }
                    >
                      <span className="text-4xl font-semibold w-full flex justify-center">
                        {images?.[index]?.image ? (
                          <img
                            src={`data:image/jpeg;base64,${images?.[index]?.image}`}
                            alt="realtor-logo"
                            className="max-w-full max-h-[22rem]"
                          />
                        ) : (
                          <p>No image found</p>
                        )}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default TopPropertiesCarousel;
