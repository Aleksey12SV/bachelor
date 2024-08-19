import { getBuildings } from "@/api/buildings";
import { createImage, deleteImage, updateImage } from "@/api/images";
import { createRealEstate, updateRealEstate } from "@/api/real-estates";
import { getSellers } from "@/api/sellers";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { RealEstate } from "@/models/RealEstate";
import {
  InfiniteData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ImageSection from "./ImageSection";
import { getPropertyTypes } from "@/api/property-types";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multiselect";
import { PaginatedData } from "@/models/PaginatedData";
import useImages from "../hooks/useImages";

const PropertyUpdateOverview = ({
  property,
  onSubmit,
  isEditing,
}: {
  property: RealEstate | undefined;
  onSubmit: () => void;
  isEditing?: boolean;
}) => {
  const queryClient = useQueryClient();

  const { data: propertyTypes } = useQuery({
    queryKey: ["property-types"],
    queryFn: getPropertyTypes,
  });
  const { data: buildings } = useQuery({
    queryKey: ["buildings"],
    queryFn: getBuildings,
  });

  const { data: sellers } = useQuery({
    queryKey: ["sellers"],
    queryFn: getSellers,
  });
  const { images, oldImages, onImageAdd, onImageDelete, onImageUpdate } =
    useImages(property?.id);
  const form = useForm<Partial<RealEstate>>({
    values: {
      floor: property?.floor,
      size: property?.size,
      rooms: property?.rooms,
      heating: property?.heating,
      status: property?.status,
      price: property?.price,
      description: property?.description,
      building: property?.building,
      sellers: property?.sellers,
      title: property?.title,
      propertyType: property?.propertyType,
    },
  });

  const saveRealEstateMutation = useMutation({
    mutationFn: async (data: Partial<RealEstate>) => {
      await createRealEstate(data).then(async ({ data }) => {
        Promise.all(
          images
            .filter((i) => i.image)
            .map((image) =>
              createImage({
                ...image,
                propertyId: data.id,
              })
            )
        );
      });
    },
    onMutate: async () => {
      await queryClient.invalidateQueries({ queryKey: ["real-estates"] });
    },
  });
  const updateRealEstateMutation = useMutation({
    mutationFn: async (data: Partial<RealEstate> & { id: number }) => {
      if (data.id === undefined) return;
      await updateRealEstate(data).then(() => {
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
            (oldImage.description !== image.description ||
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
            queryKey: ["propertyImages", String(data.id)],
          });
          await queryClient.invalidateQueries({
            queryKey: ["mainImage", data.id],
          });
        });
      });
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: ["real-estates"],
      });
      const previousFetchedRealEstates:
        | InfiniteData<PaginatedData<RealEstate>>
        | undefined = queryClient.getQueryData(["real-estates"]);
      queryClient.setQueryData<InfiniteData<PaginatedData<RealEstate>>>(
        ["real-estates"],
        (oldPropertiesInformation) => {
          if (oldPropertiesInformation === undefined)
            return oldPropertiesInformation;
          const newPropertiesPages = oldPropertiesInformation?.pages.map(
            (page) => ({
              ...page,
              content: page.content.map((realEstate) => {
                if (realEstate.id === data.id) {
                  return {
                    ...realEstate,
                    ...data,
                  };
                }
                return realEstate;
              }),
            })
          );
          return {
            ...oldPropertiesInformation,
            pages: newPropertiesPages,
          };
        }
      );
      return { previousFetchedRealEstates };
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(
        ["real-estates"],
        context?.previousFetchedRealEstates
      );
    },
  });
  const handleSubmit = (data: Partial<RealEstate>) => {
    if (isEditing) {
      property !== undefined &&
        updateRealEstateMutation.mutateAsync({ ...data, id: property.id });
    } else {
      saveRealEstateMutation.mutateAsync(data);
    }
    onSubmit();
    form.reset();
  };

  return (
    <div className="overflow-auto w-full h-full scrollable">
      <h2>{isEditing ? "Edit property" : "Add property"}</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid grid-cols-2 gap-6"
        >
          <Button type="submit">Submit</Button>
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" min={0} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="floor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Floor</FormLabel>
                <FormControl>
                  <Input type="number" min={0} step={1} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rooms</FormLabel>
                <FormControl>
                  <Input type="number" min={0} step={1} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <FormControl>
                  <Input type="number" min={0} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Ready to Use">Ready to use</SelectItem>
                    <SelectItem value="In Building Process">
                      In Building Process
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="heating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Heating</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Central">Central</SelectItem>
                    <SelectItem value="Electric">Electric</SelectItem>
                    <SelectItem value="Gas">Gas</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Real Estate Description" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => {
              console.log(field);
              return (
                <FormItem>
                  <FormLabel>Property Type</FormLabel>
                  <Select
                    onValueChange={(value) =>
                      field.onChange(
                        propertyTypes?.find((p) => p.id.toString() === value)
                      )
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <div>{field.value?.name ?? ""}</div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {propertyTypes?.map((type) => (
                        <SelectItem key={type.id} value={type.id.toString()}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="building"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Building</FormLabel>
                <Select
                  onValueChange={(value) =>
                    field.onChange(
                      buildings?.find((b) => b.id.toString() === value)
                    )
                  }
                >
                  <FormControl>
                    <SelectTrigger>
                      <div>
                        {field.value
                          ? field.value?.name +
                            ", " +
                            field.value?.district.city.name
                          : ""}
                      </div>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {buildings?.map((building) => (
                      <SelectItem
                        key={building.id}
                        value={building.id.toString()}
                      >
                        {building.name}, {building.district.city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sellers"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Sellers</FormLabel>
                <MultiSelector
                  onValuesChange={(values) => {
                    field.onChange(
                      sellers?.filter((seller) =>
                        values.includes(
                          seller.firstName + " " + seller.lastName
                        )
                      )
                    );
                  }}
                  values={(field.value ?? [])?.map(
                    (s) => s.firstName + " " + s.lastName
                  )}
                >
                  <MultiSelectorTrigger>
                    <MultiSelectorInput />
                  </MultiSelectorTrigger>
                  <MultiSelectorContent>
                    <MultiSelectorList>
                      {sellers?.map((seller) => (
                        <MultiSelectorItem
                          key={seller.id}
                          value={seller.firstName + " " + seller.lastName}
                        >
                          <div className="flex items-center space-x-2">
                            <span>
                              {seller.firstName + " " + seller.lastName}
                            </span>
                          </div>
                        </MultiSelectorItem>
                      ))}
                    </MultiSelectorList>
                  </MultiSelectorContent>
                </MultiSelector>
              </FormItem>
            )}
          />
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

export default PropertyUpdateOverview;
