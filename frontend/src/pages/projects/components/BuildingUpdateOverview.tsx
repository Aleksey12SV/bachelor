import { createBuilding, updateBuilding } from "@/api/buildings";
import { getCities } from "@/api/cities";
import { getDistrictsByCityId } from "@/api/districts";
import { createImage, deleteImage, updateImage } from "@/api/images";
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
import { Building } from "@/models/Building";
import { City } from "@/models/City";
import ImageSection from "@/pages/property-list/components/ImageSection";
import useImages from "@/pages/property-list/hooks/useImages";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const BuildingUpdateOverview = ({
  building,
  isEditing,
  onSubmit,
}: {
  building: Building | undefined;
  isEditing: boolean;
  onSubmit: () => void;
}) => {
  const queryClient = useQueryClient();
  const [selectedCity, setSelectedCity] = useState<City | undefined>(
    building?.district.city
  );
  const { images, oldImages, onImageAdd, onImageDelete, onImageUpdate } =
    useImages(building?.id, "buildingImages");
  const { data: cities } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
    initialData: [],
  });
  const { data: districts, refetch: getDistricts } = useQuery({
    queryKey: ["districts"],
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
      await queryClient.invalidateQueries({ queryKey: ["real-estates"] });
    },
  });
  const updateBuildingMutation = useMutation({
    mutationFn: async (data: Partial<Building> & { id: number }) => {
      if (data.id === undefined) return;
      await updateBuilding(data).then(() => {
        const imagesToDelete = oldImages.filter(
          (oldImage) => !images.some((image) => image.id === oldImage.id)
        );
        const imagesToAdd = images
          .filter((i) => i.image)
          .filter(
            (image) => !oldImages.some((oldImage) => image.id === oldImage.id)
          );
        const imagesToUpdate = images.filter((image) => {
          const oldImage = oldImages.find(
            (oldImage) => oldImage.id === image.id
          );
          return (
            oldImage &&
            (oldImage.descriptionBG !== image.descriptionBG ||
              oldImage.descriptionEN !== image.descriptionEN ||
              oldImage.mainImage !== image.mainImage)
          );
        });

        Promise.all([
          ...imagesToAdd.map((image) =>
            createImage({
              ...image,
              propertyId: data.id,
            })
          ),
          ...imagesToDelete.map((image) => deleteImage(image.id)),
          ...imagesToUpdate.map((image) => updateImage(image)),
        ]).then(async () => {
          await queryClient.invalidateQueries({
            queryKey: ["buildingImages", String(data.id)],
          });
          await queryClient.invalidateQueries({
            queryKey: ["buildings"],
          });
        });
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
    <div className="flex flex-col overflow-auto scrollable">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid grid-cols-2 gap-6 items-end"
        >
          <Button type="submit">Submit</Button>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
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
                <FormLabel>Floors</FormLabel>
                <FormControl>
                  <Input min={0} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input type="number" min={0} defaultValue="" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="construction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Construction</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Panel">Panel</SelectItem>
                    <SelectItem value="Brick">Brick</SelectItem>
                    <SelectItem value="Temporary construction">
                      Temporary construction
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="descriptionBG"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Building Description BG" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="descriptionEN"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Building Description EN" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div>
            <FormItem>
              <FormLabel>City</FormLabel>
              <Select
                onValueChange={(value) =>
                  setSelectedCity(cities.find((c) => c.name === value))
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <div>{selectedCity?.name ?? ""}</div>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cities?.map((city) => (
                    <SelectItem key={city.id} value={city.name}>
                      {city.name}
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
                  <FormLabel>District</FormLabel>
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
                          {field.value
                            ? field.value?.name + ", " + field.value.city.name
                            : ""}
                        </div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {(districts ?? [])?.map((d) => (
                        <SelectItem key={d.id} value={d.id.toString()}>
                          {d.name}, {d.city.name}
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
