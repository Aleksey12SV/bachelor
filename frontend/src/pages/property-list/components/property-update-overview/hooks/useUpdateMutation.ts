import { updateRealEstate } from "@/api/real-estates";
import {
  imageQueryKeys,
  realEstateQueryKeys,
} from "@/components/utils/queryFactory";
import { ImageResponse } from "@/models/Image";
import { PaginatedData } from "@/models/PaginatedData";
import { RealEstate } from "@/models/RealEstate";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const useUpdateMutation = ({
  onUpdate,
  handleImageChanges,
  images,
  oldImages,
}: {
  onUpdate?: (property: RealEstate) => void;
  handleImageChanges: ({
    images,
    oldImages,
    propertyId,
    buildingId,
  }: {
    images: ImageResponse[];
    oldImages: ImageResponse[];
    propertyId?: number;
    buildingId?: number;
  }) => Promise<unknown>;
  images: ImageResponse[];
  oldImages: ImageResponse[];
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<RealEstate> & { id: number }) => {
      if (data.id === undefined) return;
      await updateRealEstate(data).then(() =>
        handleImageChanges({ images, oldImages, propertyId: data.id }).then(
          async () => {
            await queryClient.invalidateQueries({
              queryKey: imageQueryKeys.allRealEstateImages(data.id),
            });
            await queryClient.invalidateQueries({
              queryKey: imageQueryKeys.realEstateMainImage(data.id),
            });
          }
        )
      );
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: realEstateQueryKeys.allRealEstates,
      });
      const previousFetchedRealEstates:
        | InfiniteData<PaginatedData<RealEstate>>
        | undefined = queryClient.getQueryData(
        realEstateQueryKeys.allRealEstates
      );
      queryClient.setQueryData<InfiniteData<PaginatedData<RealEstate>>>(
        realEstateQueryKeys.allRealEstates,
        (oldPropertiesInformation) => {
          if (oldPropertiesInformation === undefined)
            return oldPropertiesInformation;
          const newPropertiesPages = oldPropertiesInformation?.pages.map(
            (page) => ({
              ...page,
              content: page.content.map((realEstate) => {
                if (realEstate.id === data.id) {
                  const updatedRealEstate = {
                    ...realEstate,
                    ...data,
                  };
                  onUpdate?.(updatedRealEstate);
                  return updatedRealEstate;
                }
                return realEstate;
              }),
            })
          );
          return {
            ...oldPropertiesInformation,
            pages: newPropertiesPages,
          };
        }
      );
      return { previousFetchedRealEstates };
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(
        realEstateQueryKeys.allRealEstates,
        context?.previousFetchedRealEstates
      );
    },
  });
};

export default useUpdateMutation;
