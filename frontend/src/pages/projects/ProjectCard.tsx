import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { axiosInstance } from "@/lib/axios";
import { Building } from "@/models/Building";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useState } from "react";
import BuildindDialogContent from "./components/BuildingDialogContent";

const getImagesForBuilding = (
  id: number
): Promise<{ id: number; desription: string; image: string }[]> =>
  axiosInstance.get(`image/getAll/${id}`).then(({ data }) => data);

const ProjectCard = ({ building }: { building: Building }) => {
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const { data: images, isPending } = useQuery({
    queryKey: ["images", building.id],
    queryFn: async () => await getImagesForBuilding(building.id),
    initialData: [],
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card onClick={() => setIsDialogOpened(true)} className="flex flex-col cursor-pointer hover:bg-slate-200">
          <CardHeader>
            <CardTitle>{building.name}</CardTitle>
            <CardDescription>{`From ${building.year}`}</CardDescription>
          </CardHeader>
          <CardContent className="flex-auto">
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
      <BuildindDialogContent building={building} shouldLoadImages={isDialogOpened} onClose={() => setIsDialogOpened(false)} />
    </Dialog>
  );
};

export default ProjectCard;
