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
        <h3 className="font-medium text-xl">
          {i18n.language === "en"
            ? selectedProperty.titleEN
            : selectedProperty.titleBG}
        </h3>
        <p className="font-medium text-l">
          {t("location")}
          {": "}
          {t(`districtNames.${selectedProperty.building.district.name}`) +
            ", " +
            t(`cities.${selectedProperty.building.district.city.name}`)}
        </p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="flex flex-row gap-4">
          <span className="font-medium text-xl">
            {t("price")}
            {": "}
            {selectedProperty.price}
          </span>
          <span className="font-medium text-xl flex flex-row">
            {"("}
            {(selectedProperty.price / selectedProperty.size).toFixed(2)}
            {" €/m"}
            <p className="font-medium text-xs">2</p>
            {")"}
          </span>
        </div>
        <div className="flex flex-row gap-4">
          <span className="font-medium text-l">
            {t(selectedProperty.rooms)}
            {", "}
          </span>
          <div className=" text-l flex flex-row gap-2 items-center">
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
