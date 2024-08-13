import { ImageRequest } from "@/models/Image";
import TrashBin from "../../../assets/trash-can.svg?react";
import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";

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
  onUpdate,
}: {
  images: ImageRequest[];
  onDelete: (imageIndex: number) => void;
  onUpdate: (updatedImages: ImageRequest[]) => void;
}) => {
  const handleImageUpload = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      fileToBase64(file)
        .then((base64Image) => {
          const newImageInputs = [...images];
          newImageInputs[index].image64 = base64Image as string;
          if (index === 0) {
            newImageInputs[index].isMainImage = true;
          }

          if (index === images.length - 1) {
            // Add a new empty input field
            newImageInputs.push({ image64: "" });
          }

          onUpdate(newImageInputs);
        })
        .catch((error) => {
          console.error("Error converting file to base64", error);
        });
    }
  };
  return (
    <div className="flex flex-col pt-4 gap-4">
      <div className="font-medium">Images</div>
      {images.map((input, index) => (
        <div key={index} className="flex p-4 border rounded gap-4">
          <div className="flex flex-row gap-4 items-center">
            <Input
              type="file"
              accept="image/*"
              onChange={(event) => handleImageUpload(event, index)}
            />
          </div>
          {input.image64 && (
            <>
              <div className="image-preview">
                <img
                  src={input.image64}
                  alt={`Preview ${index}`}
                  className="max-h-48 max-w-48"
                />
              </div>
              {input.image64 && (
                <div className="flex flex-col items-center h-full flex-auto gap-4 ">
                  <div className="font-medium">Description</div>
                  <Input
                    key={input.image64}
                    className="flex-auto w-full h-full"
                    value={images[index].description}
                    onChange={(e) =>
                      onUpdate(
                        images.map((image, i) =>
                          i === index
                            ? { ...image, description: e.currentTarget.value }
                            : image
                        )
                      )
                    }
                  />
                  <button
                    onClick={() => onDelete(index)}
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
    </div>
  );
};

export default ImageSection;
