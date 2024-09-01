import { createSeller, updateSeller } from "@/api/sellers";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ExtendedSeller, Seller } from "@/models/Seller";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const SellersUpdateOverview = ({
  selectedSeller,
  isEditing,
  onSubmit,
}: {
  selectedSeller: ExtendedSeller | undefined;
  isEditing: boolean;
  onSubmit: () => void;
}) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const form = useForm<Partial<Seller>>({
    values: {
      firstName: selectedSeller?.firstName,
      lastName: selectedSeller?.lastName,
      phoneNumber: selectedSeller?.phoneNumber,
    },
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });
  const saveSellerMutation = useMutation({
    mutationFn: async (data: Partial<Seller>) => {
      await createSeller(data).then(() =>
        queryClient.invalidateQueries({
          queryKey: ["sellersWithProperties"],
        })
      );
    },
  });
  const updateSellerMutation = useMutation({
    mutationFn: async (data: Partial<Seller> & { id: number }) => {
      if (selectedSeller?.id !== undefined) {
        await updateSeller({ ...data, id: selectedSeller.id }).then(() =>
          queryClient.invalidateQueries({
            queryKey: ["sellersWithProperties"],
          })
        );
      }
    },
  });
  const handleSubmit = (data: Partial<ExtendedSeller>) => {
    if (isEditing) {
      selectedSeller !== undefined &&
        selectedSeller &&
        updateSellerMutation.mutateAsync({ ...data, id: selectedSeller.id });
    } else {
      saveSellerMutation.mutateAsync(data);
    }
    onSubmit();
    form.reset();
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid grid-cols-2 gap-6 items-end pb-4 border-b"
        >
          <Button type="submit">{t("submit")}</Button>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default SellersUpdateOverview;
