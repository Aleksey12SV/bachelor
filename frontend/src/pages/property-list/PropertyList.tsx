import { axiosInstance } from "@/lib/axios";
import { PaginatedData } from "@/models/PaginatedData";
import { RealEstate } from "@/models/RealEstate";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import PropertyCard from "./components/PropertyCard";
import { useSearchParams } from "react-router-dom";
import PropertyOverview from "./components/PropertyOverview";
import PropertyControls from "./components/PropertyControls";
import { useKeycloak } from "@/components/auth/KeycloakProvider";
import { Roles } from "@/components/auth/Roles";
import PropertyUpdateOverview from "./components/PropertyUpdateOverview";
import { FormType } from "@/models/RealEstateForm";

const deleteProperty = (id: number): Promise<void> =>
  axiosInstance.delete(`/real-estate/${id}`).then(({ data }) => data);

const getFilteredProperties = (
  filters: Partial<FormType & { page: number; size: number }>
): Promise<PaginatedData<RealEstate>> =>
  axiosInstance.post(`real-estate/filtered`, filters).then(({ data }) => data);

const PropertyList = () => {
  const [selectedProperty, setSelectedProperty] = useState<RealEstate>();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { hasRole } = useKeycloak();
  const { data, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: ["real-estates"],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) =>
      await getFilteredProperties({
        ...Object.fromEntries(searchParams),
        page: pageParam,
        size: 5,
      }),
    getNextPageParam: (response) => {
      const nextPage = response.pageable.pageNumber + 1;
      if (nextPage >= response.totalPages) return;
      return response.pageable.pageNumber + 1;
    },
  });
  const deletePropertyMutation = useMutation({
    mutationFn: async () => {
      if (selectedProperty?.id) {
        await deleteProperty(selectedProperty.id);
        await queryClient.invalidateQueries({ queryKey: ["real-estates"] });
      }
    },
  });

  const scrollableRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (scrollableRef.current) {
        const { scrollTop, clientHeight, scrollHeight } = scrollableRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 20) {
          fetchNextPage();
        }
      }
    };

    scrollableRef.current?.addEventListener("scroll", handleScroll);
    return () => {
      scrollableRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage]);
  const realEstates = useMemo(
    () => data?.pages.flatMap((p) => p.content) ?? [],
    [data?.pages]
  );

  useEffect(() => {
    if (isAdding) return;
    if (!selectedProperty) setSelectedProperty(realEstates[0]);
  }, [isAdding, realEstates, selectedProperty]);

  return (
    <div className="w-full flex flex-row">
      <div
        ref={scrollableRef}
        className="flex flex-col overflow-auto p-2 gap-2 scrollable"
      >
        {hasRole([Roles.ADMIN]) && (
          <PropertyControls
            onDelete={() =>
              deletePropertyMutation
                .mutateAsync()
                .then(() => setSelectedProperty(undefined))
            }
            hasSelectedProperty={!!selectedProperty}
            onAdd={() => {
              setIsEditing(false);
              setIsAdding(true);
              setSelectedProperty(undefined);
            }}
            onEdit={() => {
              setIsEditing(true);
              setIsAdding(false);
            }}
          />
        )}
        {realEstates.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onPreview={() => {
              setSelectedProperty(property);
              setIsAdding(false);
              setIsEditing(false);
            }}
          />
        ))}
        {isFetching && <p>Loading...</p>}
      </div>
      <div className="flex p-4 flex-auto w-full overflow-hidden">
        {selectedProperty && !isAdding && !isEditing && (
          <PropertyOverview selectedProperty={selectedProperty} />
        )}
        {isAdding && (
          <PropertyUpdateOverview
            property={undefined}
            onSubmit={() => setIsAdding(false)}
          />
        )}
        {isEditing && (
          <PropertyUpdateOverview
            property={selectedProperty}
            onSubmit={() => setIsEditing(false)}
          />
        )}
      </div>
    </div>
  );
};

export default PropertyList;
