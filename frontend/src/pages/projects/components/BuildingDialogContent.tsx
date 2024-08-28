import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Building } from "@/models/Building";
import { ImageResponse } from "@/models/Image";
import { X } from "lucide-react";

const BuildingDialogContent = ({
  building,
  shouldLoadImages,
  onClose,
  images,
}: {
  building: Building;
  shouldLoadImages: boolean;
  onClose: () => void;
  images: ImageResponse[];
}) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{building.name}</DialogTitle>
        <DialogDescription>
          <div className="h-[90vh] w-[80vw]">
            {building.description}s. shouldLoadImages:{" "}
            {String(shouldLoadImages)}
            {images.map((image) => (
              <span className="text-xl font-semibold w-full flex flex-col justify-center">
                <img
                  src={`data:image/jpeg;base64,${image?.image}`}
                  alt="realtor-logo"
                  className="max-w-[800px] max-h-[400px] aspect-video"
                />

              </span>
            ))}
          </div>
        </DialogDescription>
      </DialogHeader>
      <DialogClose
        onClick={onClose}
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-500 dark:ring-offset-neutral-950 dark:focus:ring-neutral-300 dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-neutral-400"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  );
};

export default BuildingDialogContent;
