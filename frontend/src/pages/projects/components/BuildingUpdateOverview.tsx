import { createBuilding, updateBuilding } from "@/api/buildings";
import { getCities } from "@/api/cities";
import { getDistrictsByCityId } from "@/api/districts";
import { createImage } from "@/api/images";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { handleImageChanges } from "@/components/utils/images";
import { Building } from "@/models/Building";
import { City } from "@/models/City";
import { Construction } from "@/models/RealEstateForm";
import ImageSection from "@/components/shared/ImageSection";
import useImages from "@/hooks/useImages";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  buildingQueryKeys,
  citiesQueryKeys,
  districtsQueryKeys,
  imageQueryKeys,
} from "@/components/utils/queryFactory";

const BuildingUpdateOverview = ({
  building,
  isEditing,
  onSubmit,
  page,
}: {
  building: Building | undefined;
  isEditing: boolean;
  onSubmit: () => void;
  page: number;
}) => {
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();
  const [selectedCity, setSelectedCity] = useState<City | undefined>(
    building?.district.city
  );
  const { images, oldImages, onImageAdd, onImageDelete, onImageUpdate } =
    useImages(building?.id, "buildingImages");
  const { data: cities } = useQuery({
    queryKey: citiesQueryKeys.allCities,
    queryFn: getCities,
    initialData: [],
  });
  const { data: districts, refetch: getDistricts } = useQuery({
    queryKey: districtsQueryKeys.allDistricts,
    queryFn: async () => await getDistrictsByCityId(selectedCity?.id ?? -1),
    enabled: selectedCity?.id !== undefined,
    initialData: [],
  });
  const form = useForm<Partial<Building>>({
    values: {
      name: building?.name,
      district: building?.district,
      floors: building?.floors,
      year: building?.year,
      descriptionBG: building?.descriptionBG,
      descriptionEN: building?.descriptionEN,
      construction: building?.construction,
    },
  });

  useEffect(() => {
    getDistricts();
    form.resetField("district");
  }, [form, getDistricts, selectedCity]);

  const saveBuildingMutation = useMutation({
    mutationFn: async (data: Partial<Building>) => {
      await createBuilding(data).then(async ({ data }) => {
        Promise.all(
          images
            .filter((i) => i.image)
            .map((image) =>
              createImage({
                ...image,
                buildingId: data.id,
              })
            )
        );
      });
    },
    onMutate: async () => {
      await queryClient.invalidateQueries({
        queryKey: buildingQueryKeys.allBuildings,
      });
    },
  });
  const updateBuildingMutation = useMutation({
    mutationFn: async (data: Partial<Building> & { id: number }) => {
      if (data.id === undefined) return;
      await updateBuilding(data).then(() => {
        handleImageChanges({ images, oldImages, buildingId: data.id }).then(
          async () => {
            await queryClient.invalidateQueries({
              queryKey: imageQueryKeys.allBuildingImages(data.id),
            });
            await queryClient.invalidateQueries({
              queryKey: buildingQueryKeys.paginatedBuildings(page),
            });
          }
        );
      });
    },
  });

  const handleSubmit = (data: Partial<Building>) => {
    if (!data.district) {
      form.setError(
        "district",
        { message: "District should not be empty" },
        { shouldFocus: true }
      );
      return;
    }
    if (isEditing) {
      building !== undefined &&
        updateBuildingMutation.mutateAsync({ ...data, id: building.id });
    } else {
      saveBuildingMutation.mutateAsync(data);
    }
    onSubmit();
    form.reset();
  };

  return (
    <div className="flex flex-col overflow-auto scrollable p-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid grid-cols-2 gap-6 items-end"
        >
          <Button type="submit">{t("submit")}</Button>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("name")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="floors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("floors")}</FormLabel>
                <FormControl>
                  <Input min={0} type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("year").charAt(0).toUpperCase() + t("year").slice(1)}
                </FormLabel>
                <FormControl>
                  <Input type="number" min={0} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="descriptionBG"
            render={({ field }) => (
              <FormItem className="h-full">
                <FormLabel>
                  Описание{" "}
                  {i18n.language !== "bg"
                    ? ` (${t("description", { lng: "en" })})`
                    : ""}
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="flex-auto scrollable"
                    placeholder={t("building") + " " + t("description") + " BG"}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="descriptionEN"
            render={({ field }) => (
              <FormItem className="h-full">
                <FormLabel>
                  Description{" "}
                  {i18n.language !== "en"
                    ? ` (${t("description", { lng: "bg" })})`
                    : ""}
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="flex-auto scrollable"
                    placeholder={t("building") + " " + t("description") + " EN"}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="construction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("construction")}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Construction.map((c) => (
                      <SelectItem key={c} value={c}>
                        {t(c)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <div>
            <FormItem>
              <FormLabel>{t("city")}</FormLabel>
              <Select
                onValueChange={(value) =>
                  setSelectedCity(cities.find((c) => c.name === value))
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <div>
                      {selectedCity?.name
                        ? t(`cities.${selectedCity?.name}`)
                        : ""}
                    </div>
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
            </FormItem>
          </div>
          {selectedCity && (
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("district")}</FormLabel>
                  <Select
                    onValueChange={(value) =>
                      field.onChange(
                        districts?.find((d) => d.id.toString() === value)
                      )
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <div>
                          {field.value?.name
                            ? t(`districtNames.${field.value?.name}`)
                            : ""}
                        </div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {(districts ?? [])?.map((d) => (
                        <SelectItem key={d.id} value={d.id.toString()}>
                          {t(`districtNames.${d.name}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </form>
      </Form>
      <ImageSection
        images={images}
        onDelete={onImageDelete}
        onAdd={onImageAdd}
        onUpdate={onImageUpdate}
      />
    </div>
  );
};

export default BuildingUpdateOverview;
