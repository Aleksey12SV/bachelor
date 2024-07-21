import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormType } from "../../HomePage";
import { UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { City } from "@/models/City";
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { PropertyType } from "@/models/PropertyType";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const getCities = (): Promise<City[]> =>
  axiosInstance.get("city/getAll").then(({ data }) => data);

const getPropertyTypes = (): Promise<PropertyType[]> =>
  axiosInstance.get("property-type/getAll").then(({ data }) => data);

const QuickFormContent = ({ form }: { form: UseFormReturn<FormType> }) => {
  const { data: cities } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
    initialData: [],
  });
  const { data: propertyTypes } = useQuery({
    queryKey: ["propertyTypes"],
    queryFn: getPropertyTypes,
    initialData: [],
  });
  return (
    <>
      <div className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[200px] border solid h-[30px]">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.id} value={city.name}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel className="">Property Type</FormLabel>
        {propertyTypes.map((item) => (
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
                      checked={field.value?.includes(item.name)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...(field.value ?? []), item.name])
                          : field.onChange(
                              field.value?.filter(
                                (value) => value !== item.name
                              )
                            );
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{item.name}</FormLabel>
                </FormItem>
              );
            }}
          />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="priceFrom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min Price</FormLabel>
                <FormControl>
                  <Input {...field} inputMode="numeric" pattern="\d*" min={0} measurementUnit="€"/>
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
                <FormLabel>Max Price</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    inputMode="numeric"
                    pattern="\d*"
                    min={form.getValues().priceFrom}
                    measurementUnit="€"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="minSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min Size</FormLabel>
                <FormControl>
                  <Input {...field} inputMode="numeric" pattern="\d*" min={0} measurementUnit="m²" />
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
                <FormLabel>Max Size</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    inputMode="numeric"
                    pattern="\d*"
                    min={form.getValues().priceFrom}
                    measurementUnit="m²"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormLabel>Floors</FormLabel>
              <div className="grid grid-cols-2 gap-2">
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
                          <SelectTrigger className="border solid h-[30px]">
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
                          <SelectTrigger className="border solid h-[30px]">
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
      </div>
    </>
  );
};

export default QuickFormContent;
