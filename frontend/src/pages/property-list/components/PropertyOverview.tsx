import { RealEstate } from "@/models/RealEstate";
import PropertyHeader from "./PropertyHeader";
import PropertyCarousel from "./PropertyCarousel";
import { useTranslation } from "react-i18next";
import Building from "../../../assets/building.svg?react";

const PropertyOverview = ({
  selectedProperty,
}: {
  selectedProperty: RealEstate;
}) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="flex flex-col w-full p-4 rounded-lg border border-neutral-200 overflow-auto scrollable flex-auto">
      <PropertyHeader selectedProperty={selectedProperty} />
      <div className="flex flex-col border rounded border-[#acc0f498] w-full rounded p-2 mt-2">
        <div className="flex flex-row items-center">
          <Building className="h-8 w-8" />
          <div className="flex flex-row font-medium gap-8">
            {selectedProperty.building.name}
            <p>
              {t("construction")}
              {": "}
              {t(selectedProperty.building.construction)}
            </p>
            <p>
              {t("year").charAt(0).toUpperCase() + t("year").slice(1)}
              {": "}
              {selectedProperty.building.year}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 pt-2 font-medium gap-2">
        <div>
          {t("propertyType")}
          {": "}
          {t(
            `propertyTypes.${selectedProperty.propertyType.name.toLowerCase()}.name`
          )}
        </div>
        <div>
          {t("floor")}
          {": "}
          {selectedProperty.floor}
          {" ("}
          {t("from")} {selectedProperty.building.floors}
          {")"}
        </div>
        <div>
          {t("heating")}
          {": "}
          {t(selectedProperty.heating)}
        </div>
        <div>
          {t("status")}
          {": "}
          {t(selectedProperty.status)}
        </div>
        <div>
          {t("publishDate")}
          {": "}
          {new Date(selectedProperty.publishDate).toLocaleDateString(
            i18n.language === "en" ? "en-GB" : "bg"
          )}
        </div>
      </div>
      <PropertyCarousel propertyId={selectedProperty.id.toString()} />
      <div className="font-medium pt-2">{t("description")}</div>
      {i18n.language === "en"
        ? selectedProperty.descriptionEN
        : selectedProperty.descriptionBG}
      <div className="font-medium pt-4">{t("sellers")}</div>
      <div className="flex flex-col gap-2">
        {selectedProperty.sellers.map((seller) => (
          <div className="flex flex-row justify-between border p-2 rounded">
            <p>
              {t("seller")}
              {": "}
              {seller.firstName} {seller.lastName}
            </p>
            <p>
              {t("phoneNumber")}
              {": "}
              {seller.phoneNumber}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyOverview;
