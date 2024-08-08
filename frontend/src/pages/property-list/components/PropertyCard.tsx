import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loader from "@/components/ui/loader/Loaders";
import { axiosInstance } from "@/lib/axios";
import { RealEstate } from "@/models/RealEstate";
import { useQuery } from "@tanstack/react-query";

import ImagePlaceholder from '../../../assets/image-placeholder.svg?react';

const getMainImageForProperty = (
  id: number
): Promise<{ id: number; desription: string; image: string }> =>
  axiosInstance.get(`image/main/real-estate/${id}`).then(({ data }) => data);

const PropertyCard = ({ property, onPreview }: { property: RealEstate, onPreview: () => void; }) => {
  const { data: image, isPending } = useQuery({
    queryKey: ["images", property.id],
    queryFn: async () => await getMainImageForProperty(property.id),
  });

  return (
    <Card className="flex flex-col cursor-pointer hover:bg-slate-200" onClick={onPreview}>
      <CardHeader>
        <CardTitle>{property.description}</CardTitle>
        <CardDescription>{`From ${property.building.year}, published ${property.publishDate}`}</CardDescription>
      </CardHeader>
      <CardContent className="flex-auto">
        {isPending ? (
          <Loader />
        ) : (
          <div className="h-[9rem] w-[16rem]">
            {image?.image ? <img
              src={`data:image/jpeg;base64,${image?.image}`}
              className="object-fit h-[9rem] w-[16rem]"
            /> : <ImagePlaceholder className="object-fit h-[9rem] w-[16rem]" />}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <p>{`Location: ${property.building.district.name}, ${property.building.district.city.name}`}</p>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
