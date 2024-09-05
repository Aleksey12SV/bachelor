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
import { FormType, Sorting } from "@/models/RealEstateForm";
import { useTranslation } from "react-i18next";
import { getDistrictsByCityId } from "@/api/districts";
import { useEffect, useState } from "react";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multiselect";
import { City } from "@/models/City";
import clsx from "clsx";

const QuickFormContent = ({
  form,
  showAdditionalFilters,
  onShowAdditionalFilters,
}: {
  form: UseFormReturn<FormType>;
  showAdditionalFilters: boolean;
  onShowAdditionalFilters: () => void;
}) => {
  const { t } = useTranslation();
  const { data: cities } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
    initialData: [],
  });
  const [selectedCity, setSelectedCity] = useState<City>();
  const { data: districts, refetch: getDistricts } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => await getDistrictsByCityId(selectedCity?.id ?? -1),
    enabled: selectedCity?.id !== undefined,
    initialData: [],
  });
  const { data: propertyTypes } = useQuery({
    queryKey: ["propertyTypes"],
    queryFn: getPropertyTypes,
    initialData: [],
  });
  useEffect(() => {
    getDistricts();
    form.resetField("districts");
  }, [form, getDistricts, selectedCity]);
  return (
    <>
      <div className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("location")}</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setSelectedCity(cities.find((c) => c.name === value));
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="border solid">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.id} value={city.name}>
                      {t(`cities.${city.name}`)}
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
          name="districts"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={clsx(!selectedCity && "opacity-50")}>
                {t("districts")}
              </FormLabel>
              <MultiSelector
                onValuesChange={field.onChange}
                values={field.value ?? []}
              >
                <MultiSelectorTrigger
                  className="max-h-[42px]"
                  customValues={districts
                    .filter((d) => field.value?.includes(d.name))
                    .map((d) => t(`districtNames.${d.name}`))}
                >
                  <MultiSelectorInput
                    className={clsx(
                      "overflow-hidden",
                      !selectedCity && "opacity-50"
                    )}
                    disabled={!selectedCity}
                  />
                </MultiSelectorTrigger>
                <MultiSelectorContent>
                  <MultiSelectorList
                    className={clsx(
                      "bg-white scrollable",
                      !showAdditionalFilters && "!bottom-16 !top-auto"
                    )}
                  >
                    {districts?.map((district) => (
                      <MultiSelectorItem
                        key={district.id}
                        value={district.name}
                      >
                        {t(`districtNames.${district.name}`)}
                      </MultiSelectorItem>
                    ))}
                  </MultiSelectorList>
                </MultiSelectorContent>
              </MultiSelector>
            </FormItem>
          )}
        />
        <FormLabel>{t("propertyType")}</FormLabel>
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
                    <FormLabel className="font-normal">
                      {t(`propertyTypes.${item.name.toLowerCase()}.name`)}
                    </FormLabel>
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
                <FormLabel>{t("minPrice")}</FormLabel>
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
                <FormLabel>{t("maxPrice")}</FormLabel>
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
                <FormLabel>{t("minSize")}</FormLabel>
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
                <FormLabel>{t("maxSize")}</FormLabel>
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
        <FormLabel>{t("floors")}</FormLabel>
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="minFloor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("from")}</FormLabel>
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
                <FormLabel>{t("to")}</FormLabel>
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
        <Button className="mt-8" type="submit">
          {t("search")}
        </Button>
        <FormField
          control={form.control}
          name="sorting"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("sort")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Sorting.map((sort) => (
                    <SelectItem key={sort} value={sort}>
                      {t(sort)}
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
                  {t("showPropertiesWithImagesOnly")}
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
            {t("showAdditionalFilters")}
          </Button>
        )}
      </div>
    </>
  );
};

export default QuickFormContent;
