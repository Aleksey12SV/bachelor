import { createImage } from "@/api/images";
import { createRealEstate } from "@/api/real-estates";
import { realEstateQueryKeys } from "@/components/utils/queryFactory";
import { RealEstate } from "@/models/RealEstate";
import { type Image } from "@/models/Image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useSaveMutation = (images: Image[]) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: Partial<RealEstate>) => {
      await createRealEstate(data).then(async ({ data }) => {
        Promise.all(
          images
            .filter((i) => i.image)
            .map((image) =>
              createImage({
                ...image,
                propertyId: data.id,
              })
            )
        );
        await queryClient.invalidateQueries({
          queryKey: realEstateQueryKeys.allRealEstates,
        });
        navigate(`/property-list/${data.id}`);
      });
    },
    onMutate: async () => {
      await queryClient.invalidateQueries({
        queryKey: realEstateQueryKeys.allRealEstates,
      });
    },
  });
};

export default useSaveMutation;
