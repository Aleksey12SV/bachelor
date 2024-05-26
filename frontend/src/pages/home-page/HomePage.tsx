import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { Separator } from "@/components/ui/separator";
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
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

const formSchema = z.object({
  location: z.string({ required_error: "Please select a location" }),
  priceFrom: z.string(),
  priceTo: z.string(),
  minSize: z.string(),
  maxSize: z.string(),
  minFloor: z.string(),
  maxFloor: z.string(),
  propertyTypes: z.array(z.string()).refine((v) => v.some((i) => i)),
  showRealEstatesWithoutImages: z.boolean(),
});

const getImages = (): Promise<
  { id: number; desription: string; image: string }[]
> => axiosInstance.get("image/getAll").then(({ data }) => data);

export const HomePage = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      priceFrom: "0",
      minSize: "0",
      showRealEstatesWithoutImages: true,
    },
  });

  const {data} = useQuery({ queryKey: ["images"], queryFn: getImages, initialData: [] });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log({
      title: "You submitted the following values:",
      data,
    });
  }

  return (
    <>
      <div className="w-full flex justify-center pt-2 px-6">
        <div className="h-[25rem] w-[40rem]">
          <span className="p-1 font-bold">Top Properties</span>
          <Carousel
            plugins={[plugin.current]}
            className="w-full h-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex items-center justify-center p-6 h-[25rem] w-full">
                        <span className="text-4xl font-semibold w-full flex justify-center">
                          <img
                            src={`data:image/jpeg;base64,${data?.[index]?.image}`}
                            alt="realtor-logo"
                            className="max-w-full max-h-full"
                          />
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
      <div className="pt-24 px-10">
        <span className="font-bold text-xl">Find your dream property</span>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 rounded border solid border-[#acc0f4] p-4 grid grid-cols-3"
          >
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
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
                        <SelectItem value="All">All</SelectItem>
                        <Separator />
                        <SelectItem value="Varna">Varna</SelectItem>
                        <SelectItem value="Sofia">Sofia</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {[
                { id: "Appartment", label: "Appartment" },
                { id: "House", label: "House" },
                { id: "Garage", label: "Garage" },
                { id: "Parcel", label: "Parcel" },
              ].map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="propertyTypes"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <span className="flex items-center">Price</span>
              <div className="flex flex-row">
                <FormField
                  control={form.control}
                  name="priceFrom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>From</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          className="w-[200px]"
                          step={1000}
                          min={0}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priceTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          className="w-[200px]"
                          min={form.getValues().priceFrom}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <span className="flex items-center">Size</span>
              <div className="flex flex-row">
                <FormField
                  control={form.control}
                  name="minSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>From</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          className="w-[200px]"
                          step={1}
                          min={0}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          className="w-[200px]"
                          min={form.getValues().priceFrom}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
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
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
