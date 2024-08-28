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

const ProjectCard = ({
  building,
  onSelect,
}: {
  building: Building;
  onSelect: (building: Building) => void;
}) => {
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const { data: images, isPending } = useQuery({
    queryKey: ["images", building.id],
    queryFn: async () => await getBuildingImages(building.id.toString()),
    initialData: [],
  });
  const mainImage = (images.find(i => i.mainImage) ?? images[0])
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          onClick={() => setIsDialogOpened(true)}
          className="flex flex-col flex-auto cursor-pointer hover:bg-slate-200 max-w-[500px]"
        >
          <CardHeader>
            <CardTitle>{building.name}</CardTitle>
            <CardDescription>{`From ${building.year}`}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col flex-auto h-full w-full">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(building);
              }}
            >
              Select
            </Button>
            {isPending ? (
              <Loader />
            ) : (
              <div className="flex w-full h-full">
                {mainImage ? (
                  <img
                    src={`data:image/jpeg;base64,${mainImage?.image}`}
                    className="object-contain"
                  />
                ) : (
                  <ImagePlaceholder className="h-full w-full" />
                )}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <p>{`Location: ${building.district.name}, ${building.district.city.name}`}</p>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <BuildingDialogContent
        building={building}
        shouldLoadImages={isDialogOpened}
        onClose={() => setIsDialogOpened(false)}
        images={images}
      />
    </Dialog>
  );
};

export default ProjectCard;
