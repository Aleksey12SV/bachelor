import { getSellers } from "@/api/sellers";
import { Button } from "@/components/ui/button";
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
import {
  Construction,
  FormType,
  Heating,
  Rooms,
  Status,
} from "@/models/RealEstateForm";
import { useQuery } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

const AdditionalFilters = ({
  form,
  onHideAdditionalFilters,
}: {
  form: UseFormReturn<FormType>;
  onHideAdditionalFilters: () => void;
}) => {
  const { t } = useTranslation();
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
              <FormLabel>{t("rooms")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          name="seller"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("seller")}</FormLabel>
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
                <FormLabel>{t("minPriceSqM")}</FormLabel>
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
                <FormLabel>{t("maxPriceSqM")}</FormLabel>
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
      </div>
      <div className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("status")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          name="heating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("heating")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="minYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('fromYear')}</FormLabel>
                <FormControl>
                  <Input {...field} type="number" pattern="\d*" min={0} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('toYear')}</FormLabel>
                <FormControl>
                  <Input {...field} type="number" pattern="\d*" min={0} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="construction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("construction")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        <Button className="mt-8" onClick={onHideAdditionalFilters}>
          {t("hideAdditionalFilters")}
        </Button>
      </div>
    </>
  );
};

export default AdditionalFilters;
