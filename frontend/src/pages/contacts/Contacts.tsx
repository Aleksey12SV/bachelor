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
import { Textarea } from "@/components/ui/textarea";
import { axiosInstance } from "@/lib/axios";
import { contactFormSchema, ContactFormType } from "@/models/ContactsForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const Contacts = () => {
  const { t } = useTranslation();
  const [result, setResult] = useState("");
  const form = useForm<ContactFormType>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormType) => {
    setResult("Sending....");
    axiosInstance
      .post("https://api.web3forms.com/submit", {
        ...data,
        access_key: "4df5a4d4-d1b8-43da-b2f7-34df591c4294",
      })
      .then(() => {
        setResult("Form Submitted Successfully");
      })
      .catch(() => {
        setResult("An error occured during form submission.");
      });
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-center p-8 overflow-auto scrollable">
      <div className="mb-8">{t("aboutUs")}</div>
      <h2 className="font-medium text-xl">{t("sendYourRequest")}</h2>
      <Form {...form}>
        <form
          className="flex flex-col w-full h-full gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("message")}</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit">{t("submit")}</Button>
        </form>
      </Form>
      <span>{result}</span>
    </div>
  );
};

export default Contacts;
