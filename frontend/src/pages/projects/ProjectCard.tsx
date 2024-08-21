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
import { getImagesForId } from "@/api/images";
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
    queryFn: async () => await getImagesForId(building.id),
    initialData: [],
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          onClick={() => setIsDialogOpened(true)}
          className="flex flex-col cursor-pointer hover:bg-slate-200"
        >
          <CardHeader>
            <CardTitle>{building.name}</CardTitle>
            <CardDescription>{`From ${building.year}`}</CardDescription>
          </CardHeader>
          <CardContent className="flex-auto">
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
              <img
                src={`data:image/jpeg;base64,${images?.[0]?.image}`}
                className="object-contain max-h-[30rem]"
              />
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
      />
    </Dialog>
  );
};

export default ProjectCard;
