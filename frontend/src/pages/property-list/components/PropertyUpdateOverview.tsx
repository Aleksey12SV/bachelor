import { getBuildings } from "@/api/buildings";
import { createImage, getPropertyImages } from "@/api/images";
import { createRealEstate } from "@/api/real-estates";
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
import { ImageRequest } from "@/models/Image";
import { RealEstate } from "@/models/RealEstate";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ImageSection from "./ImageSection";
import { getPropertyTypes } from "@/api/property-types";

const PropertyUpdateOverview = ({
  property,
  onSubmit,
}: {
  property: RealEstate | undefined;
  onSubmit: () => void;
}) => {
  const [images, setImages] = useState<ImageRequest[]>([{ image64: "" }]);
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
  const { data: propertyImages } = useQuery({
    queryKey: ["propertyImages", property?.id],
    queryFn: () => getPropertyImages(property?.id.toString() ?? ""),
    initialData: [],
    enabled: property?.id !== undefined,
  });
  const form = useForm<Partial<RealEstate>>({
    values: {
      floor: property?.floor,
      size: property?.size,
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
      await createRealEstate(data).then(({ data }) => {
        Promise.all(
          images
            .filter((i) => i.image64)
            .map((image) =>
              createImage({ ...image, propertyId: data.id, description: "" })
            )
        );
      });
    },
  });
  const handleSubmit = (data: Partial<RealEstate>) => {
    console.log({
      title: "You submitted the following values:",
      data,
    });
    saveRealEstateMutation.mutateAsync(data);
    onSubmit();
    form.reset();
  };
  console.log(form);
  return (
    <div className="overflow-auto w-full h-full">
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
                    <SelectItem value="GRUB_STROEJ">Grub stroej</SelectItem>
                    <SelectItem value="AKT_14">AKT 14</SelectItem>
                    <SelectItem value="AKT_15">AKT 15</SelectItem>
                    <SelectItem value="AKT_16">AKT 16</SelectItem>
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
                    value={field.value?.name}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue>{field.value?.name}</SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {propertyTypes?.map((type) => (
                        <SelectItem value={type.id.toString()}>
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
                  value={field.value?.name}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue>
                        {field.value?.name + ", " + field.value?.district.city}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {buildings?.map((building) => (
                      <SelectItem value={building.id.toString()}>
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
              <FormItem>
                <FormLabel>Sellers</FormLabel>
                <Select
                  onValueChange={(value) =>
                    field.onChange(
                      sellers?.find((s) => s.id.toString() === value)
                    )
                  }
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sellers?.map((s) => (
                      <SelectItem value={s.id.toString()}>
                        {s.firstName}, {s.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <ImageSection
        images={propertyImages}
        onDelete={(imageIndex) =>
          setImages(images.filter((_, i) => i !== imageIndex))
        }
        onUpdate={(updatedImages) => setImages(updatedImages)}
      />
    </div>
  );
};

export default PropertyUpdateOverview;
