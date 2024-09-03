import { useState } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import QuickFormContent from "./components/quick-form/QuickFormContent";
import { useNavigate } from "react-router-dom";
import { formSchema, FormType } from "@/models/RealEstateForm";
import AdditionalFilters from "./components/additional-filters/AdditionalFilters";
import TopPropertiesCarousel from "./components/top-properties-carousel/TopPropertiesCarousel";

export const HomePage = () => {
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      priceFrom: "0",
      minSize: "0",
      showRealEstatesWithoutImages: true,
    },
  });

  function onSubmit(data: FormType) {
    const cleanData = JSON.parse(JSON.stringify(data));
    const queryString = new URLSearchParams(cleanData).toString();
    navigate(`/property-list?${queryString}`);
  }

  return (
    <div className="flex flex-col w-full">
      {!showMoreFilters && <TopPropertiesCarousel />}
      <div
        className={`${
          !showMoreFilters ? "pt-2" : ""
        } px-10 flex flex-col flex-auto gap-4 pb-4`}
      >
        <span className="font-bold text-xl">{t("findYourDreamProperty")}</span>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded border solid border-[#acc0f4] p-4 grid grid-cols-3 flex-auto gap-x-10"
          >
            <QuickFormContent
              form={form}
              showAdditionalFilters={showMoreFilters}
              onShowAdditionalFilters={() => setShowMoreFilters(true)}
            />
            {showMoreFilters && (
              <AdditionalFilters
                form={form}
                onHideAdditionalFilters={() => setShowMoreFilters(false)}
              />
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};
