import { type Image } from "@/models/Image";
import TrashBin from "../../../assets/trash-can.svg?react";
import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";

const fileToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const ImageSection = ({
  images,
  onDelete,
  onAdd,
  onUpdate,
}: {
  images: Image[];
  onDelete: (image: Image) => void;
  onAdd: (image: Image) => void;
  onUpdate: (image: Image) => void;
}) => {
  const handleImageUpload = (
    event: ChangeEvent<HTMLInputElement>,
    imageId: string
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      fileToBase64(file)
        .then((base64Image) => {
          const img = new Image();
          img.src = base64Image as string;
          img.decode().then(() => {
            onUpdate({
              id: imageId,
              image: (base64Image as string).split(",")[1],
              width: img.width,
              height: img.height,
            });
          });
        })
        .catch((error) => {
          console.error("Error converting file to base64", error);
        });
    }
  };
  return (
    <div className="flex flex-col pt-4 gap-4">
      <div className="font-medium">Images</div>
      {images.map((image, index) => (
        <div key={index} className="flex p-4 border rounded gap-4">
          {!image.image && (
            <div className="flex flex-row gap-4 items-center">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, image.id)}
              />
            </div>
          )}
          {image.image && (
            <>
              <div className="image-preview">
                <img
                  src={`data:image/jpeg;base64,${image.image}`}
                  alt={`Preview ${index}`}
                  className="max-h-48 max-w-48"
                />
              </div>
              {image.image && (
                <div className="flex flex-col items-center h-full flex-auto gap-4 ">
                  <div className="font-medium">Description BG</div>
                  <Input
                    key={image.id}
                    className="flex-auto w-full h-full"
                    value={images[index].descriptionBG}
                    onChange={(e) =>
                      onUpdate({
                        ...image,
                        descriptionBG: e.currentTarget.value,
                      })
                    }
                  />
                  <div className="font-medium">Description EN</div>
                  <Input
                    key={image.id}
                    className="flex-auto w-full h-full"
                    value={images[index].descriptionEN}
                    onChange={(e) =>
                      onUpdate({
                        ...image,
                        descriptionEN: e.currentTarget.value,
                      })
                    }
                  />
                  <input
                    type="checkbox"
                    disabled={
                      !image.mainImage && images.some((i) => i.mainImage)
                    }
                    onChange={(e) => {
                      onUpdate({
                        ...image,
                        mainImage: e.target.checked,
                      });
                    }}
                    checked={!!image.mainImage}
                  />
                  <button
                    onClick={() => onDelete(image)}
                    className="flex flex-row items-center border rounded p-2 gap-2"
                  >
                    <span>Delete image</span>
                    <TrashBin className="h-4 w-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      ))}
      <Button onClick={() => onAdd({ id: uuidv4(), image: "" })}>
        Add image
      </Button>
    </div>
  );
};

export default ImageSection;
