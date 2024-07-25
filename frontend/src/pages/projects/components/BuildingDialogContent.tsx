import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Building } from "@/models/Building";
import { X } from "lucide-react";

const BuildindDialogContent = ({
  building,
  shouldLoadImages,
  onClose
}: {
  building: Building;
  shouldLoadImages: boolean;
  onClose: () => void
}) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{building.name}</DialogTitle>
        <DialogDescription>
          {building.description}s. shouldLoadImages:{" "}
          {String(shouldLoadImages)}
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

export default BuildindDialogContent;
