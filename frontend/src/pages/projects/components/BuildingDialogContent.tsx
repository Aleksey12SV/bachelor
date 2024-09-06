import { getBuildingImages } from "@/api/images";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { imageQueryKeys } from "@/components/utils/queryFactory";
import { Building } from "@/models/Building";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Location from "../../../assets/location-svg.svg?react";
import Calendar from "../../../assets/calendar.svg?react";
import Floors from "../../../assets/floors.svg?react";
import Construction from "../../../assets/construction.svg?react";

const BuildingDialogContent = ({
  building,
  onClose,
}: {
  building: Building;
  onClose: () => void;
}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { data: images } = useQuery({
    queryKey: imageQueryKeys.allBuildingImages(building.id),
    queryFn: async () => await getBuildingImages(building.id.toString()),
    initialData: [],
  });
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{building.name}</DialogTitle>
        <DialogDescription asChild>
          <div className="h-[90vh] flex flex-row overflow-auto scrollable">
            <div className="flex flex-col flex-auto h-full w-full gap-2 min-w-[50vw]">
              {images.map((image) => (
                <span className="text-xl font-semibold w-full flex flex-col justify-center rounded p-2 border items-center">
                  <img
                    src={`data:image/jpeg;base64,${image?.image}`}
                    alt="realtor-logo"
                    className="max-w-[800px] max-h-[400px] object-contain"
                  />
                </span>
              ))}
            </div>
            <div className="flex flex-col pl-4 pr-2 gap-2">
              <Button
                onClick={() =>
                  navigate(`/property-list?buildingId=${building.id}`)
                }
                className="w-full outline-none mb-2"
              >
                {t("seeAllPropertiesInBuilding")}
              </Button>
              <div className="w-full flex flex-row items-center gap-4">
                <Location className="w-8 h-8" />
                <p className="font-medium">
                  {t(`cities.${building.district.city.name}`) +
                    ", " +
                    t(`districtNames.${building.district.name}`)}
                </p>
              </div>
              <div className="w-full flex flex-row items-center gap-4">
                <Calendar className="w-8 h-8" />
                <p className="font-medium">{building.year}</p>
              </div>
              <div className="w-full flex flex-row items-center gap-4">
                <Floors className="w-8 h-8" />
                <p className="font-medium">
                  {t("floors") + ": "}
                  {building.floors}
                </p>
              </div>
              <div className="w-full flex flex-row items-center gap-4">
                <Construction className="w-8 h-8" />
                <p className="font-medium">
                  {t("construction") + ": "}
                  {t(building.construction)}
                </p>
              </div>
              <div className="font-medium pt-2">{t("description")}</div>
              {i18n.language === "en"
                ? building.descriptionEN
                : building.descriptionBG}
            </div>
          </div>
        </DialogDescription>
      </DialogHeader>
      <DialogClose
        onClick={onClose}
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-500 dark:ring-offset-neutral-950 dark:focus:ring-neutral-300 dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-neutral-400"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">{t("close")}</span>
      </DialogClose>
    </DialogContent>
  );
};

export default BuildingDialogContent;
