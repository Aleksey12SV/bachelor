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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { useTranslation } from "react-i18next";
import QuickFormContent from "./components/quick-form/QuickFormContent";

const formSchema = z.object({
  location: z.string({ required_error: "Please select a location" }),
  priceFrom: z.string().optional(),
  priceTo: z.string().optional(),
  minSize: z.string().optional(),
  maxSize: z.string().optional(),
  minFloor: z.string().optional(),
  maxFloor: z.string().optional(),
  propertyTypes: z
    .array(z.string())
    .refine((v) => v.some((i) => i))
    .optional(),
  showRealEstatesWithoutImages: z.boolean(),
});

export type FormType = z.infer<typeof formSchema>;

const getImages = (): Promise<
  { id: number; desription: string; image: string }[]
> => axiosInstance.get("image/getAll").then(({ data }) => data);

export const HomePage = () => {
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const { t } = useTranslation();

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      priceFrom: "0",
      minSize: "0",
      showRealEstatesWithoutImages: true,
    },
  });

  const { data } = useQuery({
    queryKey: ["images"],
    queryFn: getImages,
    initialData: [],
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log({
      title: "You submitted the following values:",
      data,
    });
  }

  return (
    <div className="flex flex-col">
      {!showMoreFilters && (
        <div className="w-full h-[25rem] flex justify-center pt-2 px-6">
          <div className="w-[40rem] flex flex-col">
            <span className="p-1 font-bold">{t("topProperties")}</span>
            <Carousel
              plugins={[plugin.current]}
              className="flex-auto"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex items-center justify-center p-6 flex-auto w-full min-h-[22rem]">
                          <span className="text-4xl font-semibold w-full flex justify-center">
                            {data?.[index]?.image ? (
                              <img
                                src={`data:image/jpeg;base64,${data?.[index]?.image}`}
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
            className="rounded border solid border-[#acc0f4] p-4 grid grid-cols-3 flex-auto gap-10"
          >
            <QuickFormContent form={form} />
            <div className="flex flex-col gap-4">
              <Button type="submit">Submit</Button>
              <FormField
                control={form.control}
                name="showRealEstatesWithoutImages"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={!field.value}
                          onCheckedChange={(checked) =>
                            field.onChange(!checked)
                          }
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Show properties with images only
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
              <button
                onClick={(e) => {
                  setShowMoreFilters(true);
                  e.preventDefault();
                }}
              >
                Show filter
              </button>
            </div>
            {showMoreFilters && (
              <div className="flex flex-col gap-4">
                <Button type="submit">Submit</Button>
                <span className="flex items-center">Floors</span>
                <div className="flex flex-row gap-2">
                  <FormField
                    control={form.control}
                    name="minFloor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Min</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-[200px] border solid h-[30px]">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="maxFloor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-[200px] border solid h-[30px]">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="showRealEstatesWithoutImages"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={!field.value}
                            onCheckedChange={(checked) =>
                              field.onChange(!checked)
                            }
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Show properties with images only
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
                <button
                  onClick={(e) => {
                    setShowMoreFilters(false);
                    e.preventDefault();
                  }}
                >
                  HIde filter
                </button>
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};
