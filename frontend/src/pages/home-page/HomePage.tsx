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
import realtorBGLogo from "../../assets/realtorBG.svg";
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
  FormDescription,
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

const formSchema = z.object({
  location: z.string({ required_error: "Please select a location" }),
  priceFrom: z.string(),
  priceTo: z.string(),
});

export const HomePage = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      priceFrom: "0",
    },
  });

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
                      <CardContent className="flex items-center justify-center p-6 h-[25rem]">
                        <span className="text-4xl font-semibold">
                          <img
                            src={realtorBGLogo}
                            alt="realtor-logo"
                            className="w-24"
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
            className="mt-4 rounded border solid border-[#acc0f4] p-4"
          >
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
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  );
};
