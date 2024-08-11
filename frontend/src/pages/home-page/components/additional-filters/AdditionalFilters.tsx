import { getSellers } from "@/api/sellers";
import {
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
import { FormType, RoomsEnum } from "@/models/RealEstateForm";
import { useQuery } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";

const AdditionalFilters = ({
  form,
  onHideAdditionalFilters,
}: {
  form: UseFormReturn<FormType>;
  onHideAdditionalFilters: () => void;
}) => {
  const { data: sellers } = useQuery({
    queryKey: ["sellers"],
    queryFn: getSellers,
    initialData: [],
  });
  return (
    <>
      <div className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="rooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rooms</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border solid h-[30px]">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {RoomsEnum.map((room) => (
                    <SelectItem key={room} value={room}>
                      {room}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="seller"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seller</FormLabel>
              <Select onValueChange={field.onChange}>
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
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="priceFromSqM"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min Price SqM</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    inputMode="numeric"
                    pattern="\d*"
                    min={0}
                    measurementUnit="€"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priceToSqM"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Price SqM</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    inputMode="numeric"
                    pattern="\d*"
                    min={form.getValues().priceFrom}
                    measurementUnit="€"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <button onClick={onHideAdditionalFilters}>Hide filter</button>
      </div>
      <div className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
      </div>
    </>
  );
};

export default AdditionalFilters;
