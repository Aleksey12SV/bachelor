import { getBuildings } from "@/api/buildings";
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
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ImageSection from "../../../../components/shared/ImageSection";
import { getPropertyTypes } from "@/api/property-types";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multiselect";
import useImages from "../../../../hooks/useImages";
import { handleImageChanges } from "@/components/utils/images";
import {
  buildingQueryKeys,
  propertyTypesQueryKeys,
  sellersQueryKeys,
} from "@/components/utils/queryFactory";
import useSaveMutation from "./hooks/useSaveMutation";
import useUpdateMutation from "./hooks/useUpdateMutation";
import { useTranslation } from "react-i18next";
import { Heating, Rooms, Status } from "@/models/RealEstateForm";
import validatePropertyForm from "./utils/validatePropertyForm";

const PropertyUpdateOverview = ({
  property,
  onSubmit,
  onUpdate,
  isEditing,
}: {
  property: RealEstate | undefined;
  onSubmit: () => void;
  onUpdate?: (property: RealEstate) => void;
  isEditing?: boolean;
}) => {
  const { t, i18n } = useTranslation();
  const { data: propertyTypes } = useQuery({
    queryKey: propertyTypesQueryKeys.allPropertyTypes,
    queryFn: getPropertyTypes,
  });
  const { data: buildings } = useQuery({
    queryKey: buildingQueryKeys.allBuildings,
    queryFn: getBuildings,
  });

  const { data: sellers } = useQuery({
    queryKey: sellersQueryKeys.allSellers,
    queryFn: getSellers,
  });
  const { images, oldImages, onImageAdd, onImageDelete, onImageUpdate } =
    useImages(property?.id, "propertyImages");
  const form = useForm<Partial<RealEstate>>({
    values: {
      floor: property?.floor,
      size: property?.size,
      rooms: property?.rooms,
      heating: property?.heating,
      status: property?.status,
      price: property?.price,
      descriptionBG: property?.descriptionBG,
      descriptionEN: property?.descriptionEN,
      building: property?.building,
      sellers: property?.sellers,
      titleBG: property?.titleBG,
      titleEN: property?.titleEN,
      propertyType: property?.propertyType,
      topProperty: property?.topProperty
    },
  });

  const saveRealEstateMutation = useSaveMutation(images);
  const updateRealEstateMutation = useUpdateMutation({
    handleImageChanges,
    images,
    oldImages,
    onUpdate,
  });

  const handleSubmit = (data: Partial<RealEstate>) => {
    if (validatePropertyForm({ form, data })) return;
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
    <div className="overflow-auto w-full h-full px-2 scrollable">
      <h2 className="font-medium">
        {isEditing ? t("editProperty") : t("addProperty")}
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid grid-cols-2 gap-6 items-end"
        >
          <Button type="submit">{t("submit")}</Button>
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("price")}</FormLabel>
                <FormControl>
                  <Input type="number" min={0} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="titleBG"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Заглавие
                  {i18n.language !== "bg"
                    ? ` (${t("title", { lng: "en" })})`
                    : ""}
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="titleEN"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Title
                  {i18n.language !== "en"
                    ? ` (${t("title", { lng: "bg" })})`
                    : ""}
                </FormLabel>
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
                <FormLabel>{t("floor")}</FormLabel>
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
                <FormLabel>{t("rooms")}</FormLabel>
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
                    {Rooms.map((room) => (
                      <SelectItem key={room} value={room}>
                        {t(room)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("size")}</FormLabel>
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
                <FormLabel>{t("status")}</FormLabel>
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
                    {Status.map((s) => (
                      <SelectItem key={s} value={s}>
                        {t(s)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="descriptionBG"
            render={({ field }) => (
              <FormItem className="h-full">
                <FormLabel>
                  Описание
                  {i18n.language !== "bg"
                    ? ` (${t("description", { lng: "en" })})`
                    : ""}
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="flex-auto scrollable"
                    placeholder="Real Estate Description BG"
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
                  Description
                  {i18n.language !== "en"
                    ? ` (${t("description", { lng: "bg" })})`
                    : ""}
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="flex-auto scrollable"
                    placeholder="Real Estate Description EN"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="heating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("heating")}</FormLabel>
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
                    {Heating.map((h) => (
                      <SelectItem key={h} value={h}>
                        {t(h)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="topProperty"
            render={({ field }) => (
              <div className="flex flex-col items-start h-full">
                <FormLabel htmlFor="mainImage">
                  {t("markAsTopProperty")}
                </FormLabel>
                <div className='flex h-full items-center'>
                <input
                  type="checkbox"
                  id="topProperty"
                  name="topProperty"
                  className="h-6 w-6"
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  checked={field.value}
                />
                </div>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>{t("propertyType")}</FormLabel>
                  <Select
                    onValueChange={(value) =>
                      field.onChange(
                        propertyTypes?.find((p) => p.id.toString() === value)
                      )
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <div>
                          {field.value?.name
                            ? t(
                                `propertyTypes.${field.value?.name.toLowerCase()}.name`
                              )
                            : ""}
                        </div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {propertyTypes?.map((type) => (
                        <SelectItem key={type.id} value={type.id.toString()}>
                          {t(`propertyTypes.${type.name.toLowerCase()}.name`)}
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
                <FormLabel>{t("building")}</FormLabel>
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
                <FormLabel>{t("sellers")}</FormLabel>
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
                    <MultiSelectorList className="bg-white scrollable !bottom-16 !top-auto">
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
