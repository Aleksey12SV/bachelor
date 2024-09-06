import { useTranslation } from "react-i18next";
import { RealEstate } from "@/models/RealEstate";

const PropertyHeader = ({
  selectedProperty,
}: {
  selectedProperty: RealEstate;
}) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium text-2xl">
          {i18n.language === "en"
            ? selectedProperty.titleEN
            : selectedProperty.titleBG}
        </h3>
        <p className="font-medium text-xl">
          {t("location")}
          {": "}
          {t(`districtNames.${selectedProperty.building.district.name}`) +
            ", " +
            t(`cities.${selectedProperty.building.district.city.name}`)}
        </p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="flex flex-row gap-4">
          <span className="font-medium text-2xl">
            {t("price")}
            {": "}
            {selectedProperty.price}
          </span>
          <span className="font-medium text-2xl flex flex-row">
            {"("}
            {selectedProperty.price / selectedProperty.size}
            {" €/m"}
            <p className="font-medium text-xs">2</p>
            {")"}
          </span>
        </div>
        <div className="flex flex-row gap-4">
          <span className="font-medium text-xl">
            {t(selectedProperty.rooms)}
            {", "}
          </span>
          <div className=" text-xl flex flex-row gap-2 items-center">
            {/* <SquareMeasurement className="h-4 w-4" /> */}
            <div className="flex flex-row font-medium">
              {selectedProperty.size}m<p className="font-medium text-xs">2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyHeader;
