import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "@/components/ui/loader/Loaders";
import { RealEstate } from "@/models/RealEstate";
import { useQuery } from "@tanstack/react-query";

import ImagePlaceholder from "../../../../assets/image-placeholder.svg?react";
import { getMainImageForProperty } from "@/api/images";
import { imageQueryKeys } from "@/components/utils/queryFactory";
import { useTranslation } from "react-i18next";
import Location from "../../../../assets/location-svg.svg?react";
import SquareMeasurement from "../../../../assets/square-measument.svg?react";
import "./styles.css";

const PropertyCard = ({
  property,
  onPreview,
}: {
  property: RealEstate;
  onPreview: () => void;
}) => {
  const { t, i18n } = useTranslation();
  const { data: image, isPending } = useQuery({
    queryKey: imageQueryKeys.realEstateMainImage(property.id),
    queryFn: async () => await getMainImageForProperty(property.id),
  });

  return (
    <Card
      className="flex flex-col cursor-pointer hover:bg-slate-200 h-[275px] oveflow-hidden"
      onClick={onPreview}
    >
      <CardHeader className="!p-3">
        <CardTitle className="text-lg truncate">
          {i18n.language === "en" ? property.titleEN : property.titleBG}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex !p-3 !pt-0">
        {isPending ? (
          <Loader />
        ) : (
          <div className="flex flex-row overflow-hidden">
            {image?.image ? (
              <img
                src={`data:image/jpeg;base64,${image?.image}`}
                className="h-[10rem] w-[12rem] border rounded p-2"
              />
            ) : (
              <div className="flex h-[10rem] w-[12rem] border rounded">
              <ImagePlaceholder className="h-full" />
              </div>
            )}
            <div className="flex flex-col pl-3 gap-1 w-full overflow-hidden">
              <div className="flex flex-row gap-2">
                <p className="flex font-medium text-lg">{property.price}€,</p>
                <p className="flex font-medium text-lg">{t(property.rooms)}</p>
              </div>
              <div className="flex flex-row w-full gap-2 items-center">
                <Location className="h-4 w-4" />
                <p className="font-medium">
                  {t(`districtNames.${property.building.district.name}`) +
                    ", " +
                    t(`cities.${property.building.district.city.name}`)}
                </p>
              </div>
              <div className="flex flex-row w-full gap-2 items-center">
                <SquareMeasurement className="h-4 w-4" />
                <div className="flex flex-row font-medium">
                  {property.size}m<p className="font-medium text-xs">2</p>
                </div>
              </div>
              <p className="multiline-text-truncation">
                {i18n.language === "en"
                  ? property.descriptionEN
                  : property.descriptionBG}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
