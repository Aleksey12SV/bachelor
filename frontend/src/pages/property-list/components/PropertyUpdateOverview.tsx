import { getBuildings } from "@/api/buildings";
import { createImage } from "@/api/images";
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
import { axiosInstance } from "@/lib/axios";
import { ImageRequest } from "@/models/Image";
import { PropertyType } from "@/models/PropertyType";
import { RealEstate } from "@/models/RealEstate";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";

const getPropertyTypes = (): Promise<PropertyType[]> =>
  axiosInstance.get(`property-type/getAll`).then(({ data }) => data);

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
  const form = useForm<Partial<RealEstate>>({
    defaultValues: {
      heating: property?.heating,
      price: property?.price,
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

  function handleSubmit(data: Partial<RealEstate>) {
    console.log({
      title: "You submitted the following values:",
      data,
    });
    saveRealEstateMutation.mutateAsync(data);
    onSubmit();
    form.reset();
  }

  const handleImageUpload = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      fileToBase64(file)
        .then((base64Image) => {
          const newImageInputs = [...images];
          newImageInputs[index].image64 = base64Image as string;
          if (index === 0) {
            newImageInputs[index].isMainImage = true;
          }

          if (index === images.length - 1) {
            // Add a new empty input field
            newImageInputs.push({ image64: "" });
          }

          setImages(newImageInputs);
        })
        .catch((error) => {
          console.error("Error converting file to base64", error);
        });
    }
  };
  console.log(images);
  const fileToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  return (
    <div className="overflow-auto">
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Gas">Gas</SelectItem>
                    <SelectItem value="TEC">Tec</SelectItem>
                    <SelectItem value="Lokalno">Lokalno</SelectItem>
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
            render={({ field }) => (
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
                      <SelectValue />
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
            )}
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
                      <SelectValue />
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
      {images.map((input, index) => (
        <div key={index} className="image-upload-field">
          <input
            type="file"
            accept="image/*"
            onChange={(event) => handleImageUpload(event, index)}
          />
          {input.image64 && (
            <button
              onClick={() => setImages(images.filter((_, i) => i !== index))}
            >
              Delete image {index}
            </button>
          )}
          {input.image64 && (
            <div className="image-preview">
              <img
                src={input.image64}
                alt={`Preview ${index}`}
                className="max-h-24 max-w-24"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PropertyUpdateOverview;
