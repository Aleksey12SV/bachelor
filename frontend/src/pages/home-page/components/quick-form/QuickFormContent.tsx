import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getCities } from "@/api/cities";
import { getPropertyTypes } from "@/api/property-types";
import { FormType, SortingEnum } from "@/models/RealEstateForm";

const QuickFormContent = ({
  form,
  showAdditionalFilters,
  onShowAdditionalFilters,
}: {
  form: UseFormReturn<FormType>;
  showAdditionalFilters: boolean;
  onShowAdditionalFilters: () => void;
}) => {
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
                  <SelectTrigger className="border solid">
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
        <FormLabel>Property Type</FormLabel>
        <div className="grid grid-cols-2 gap-2">
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
                            ? field.onChange([
                                ...(field.value ?? []),
                                item.name,
                              ])
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
                  <Input
                    {...field}
                    inputMode="numeric"
                    pattern="\d*"
                    min={0}
                    measurementUnit="€"
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
                  <Input
                    {...field}
                    inputMode="numeric"
                    pattern="\d*"
                    min={0}
                    measurementUnit="m²"
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
                    <SelectTrigger className="border solid">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from({ length: 30 }, (_, i) => i).map((value) => (
                      <SelectItem key={value} value={value.toString()}>
                        {value}
                      </SelectItem>
                    ))}
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
                    <SelectTrigger className="border solid">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from({ length: 30 }, (_, i) => i).map((value) => (
                      <SelectItem key={value} value={value.toString()}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Button className="mt-8" type="submit">Submit</Button>
        <FormField
          control={form.control}
          name="sorting"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sort</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SortingEnum.map((sort) => (
                    <SelectItem key={sort} value={sort}>
                      {sort}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="showRealEstatesWithoutImages"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={!field.value}
                    onCheckedChange={(checked) => field.onChange(!checked)}
                  />
                </FormControl>
                <FormLabel className="font-normal">
                  Show properties with images only
                </FormLabel>
              </FormItem>
            );
          }}
        />
        {!showAdditionalFilters && (
          <Button
            className="mt-auto self-end"
            onClick={(e) => {
              e.preventDefault();
              onShowAdditionalFilters();
            }}
          >
            Show additional filters
          </Button>
        )}
      </div>
    </>
  );
};

export default QuickFormContent;
