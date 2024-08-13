import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { useTranslation } from "react-i18next";
import QuickFormContent from "./components/quick-form/QuickFormContent";
import { useNavigate } from "react-router-dom";
import { formSchema, FormType } from "@/models/RealEstateForm";
import AdditionalFilters from "./components/additional-filters/AdditionalFilters";

const getImages = (): Promise<
  { id: number; desription: string; image: string }[]
> => axiosInstance.get("image/getAll").then(({ data }) => data);

export const HomePage = () => {
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      priceFrom: "0",
      minSize: "0",
      showRealEstatesWithoutImages: true,
    },
  });

  const { data: images } = useQuery({
    queryKey: ["images"],
    queryFn: getImages,
    initialData: [],
  });

  function onSubmit(data: FormType) {
    console.log({
      title: "You submitted the following values:",
      data,
    });
    const cleanData = JSON.parse(JSON.stringify(data));
    const queryString = new URLSearchParams(cleanData).toString();
    navigate(`/property-list?${queryString}`);
  }

  return (
    <div className="flex flex-col w-full">
      {!showMoreFilters && (
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
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex items-center justify-center p-6 flex-auto w-full min-h-[22rem]">
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
      )}
      <div
        className={`${
          !showMoreFilters ? "pt-10" : ""
        } px-10 flex flex-col flex-auto gap-4 pb-4`}
      >
        <span className="font-bold text-xl">Find your dream property</span>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded border solid border-[#acc0f4] p-4 grid grid-cols-3 flex-auto gap-x-10"
          >
            <QuickFormContent
              form={form}
              onShowAdditionalFilters={() => setShowMoreFilters(true)}
            />
            {showMoreFilters && (
              <AdditionalFilters
                form={form}
                onHideAdditionalFilters={() => setShowMoreFilters(false)}
              />
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};
