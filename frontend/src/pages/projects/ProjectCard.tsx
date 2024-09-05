import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Building } from "@/models/Building";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useState } from "react";
import BuildingDialogContent from "./components/BuildingDialogContent";
import { getBuildingImages } from "@/api/images";
import ImagePlaceholder from "../../assets/image-placeholder.svg?react";
import { Button } from "@/components/ui/button";
import { useKeycloak } from "@/components/auth/KeycloakProvider";
import { Roles } from "@/components/auth/Roles";
import { useTranslation } from "react-i18next";
import { imageQueryKeys } from "@/components/utils/queryFactory";

const ProjectCard = ({
  building,
  onSelect,
}: {
  building: Building;
  onSelect: (building: Building) => void;
}) => {
  const { t } = useTranslation();
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const { data: images, isPending } = useQuery({
    queryKey: imageQueryKeys.allBuildingImages(building.id),
    queryFn: async () => await getBuildingImages(building.id.toString()),
    initialData: [],
  });
  const { hasRole } = useKeycloak();
  const mainImage = images.find((i) => i.mainImage) ?? images[0];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          onClick={() => setIsDialogOpened(true)}
          className="flex flex-col flex-auto cursor-pointer hover:bg-slate-200 max-w-[500px] overflow-hidden"
        >
          <CardHeader>
            <CardTitle>{building.name}</CardTitle>
            <div className="flex flex-row justify-between pt-2">
              <CardDescription>{`${t("from")} ${building?.year} ${t(
                "year"
              )}`}</CardDescription>
              <CardDescription>
                {t("construction")}
                {`: ${t(building.construction)}`}
              </CardDescription>
            </div>
            <CardDescription>
              {t("floors")}
              {`: ${building.floors}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col flex-auto w-full overflow-hidden">
            {hasRole([Roles.ADMIN]) && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(building);
                }}
              >
                {t("select")}
              </Button>
            )}
            {isPending ? (
              <Loader />
            ) : (
              <div className="flex w-full h-full max-h-[450px] items-center justify-center">
                {mainImage ? (
                  <img
                    src={`data:image/jpeg;base64,${mainImage?.image}`}
                    className="object-contain h-full p-4"
                  />
                ) : (
                  <ImagePlaceholder className="max-w-[400px] max-h-[250px] w-full" />
                )}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <p>{`${t("location")}: ${t(
              `districtNames.${building.district.name}`
            )}, ${t(`cities.${building.district.city.name}`)}`}</p>
          </CardFooter>
        </Card>
      </DialogTrigger>
      {isDialogOpened && (
        <BuildingDialogContent
          building={building}
          onClose={() => setIsDialogOpened(false)}
        />
      )}
    </Dialog>
  );
};

export default ProjectCard;
