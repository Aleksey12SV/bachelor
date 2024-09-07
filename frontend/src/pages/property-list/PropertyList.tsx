import { RealEstate } from "@/models/RealEstate";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import PropertyCard from "./components/property-card/PropertyCard";
import { useParams, useSearchParams } from "react-router-dom";
import PropertyOverview from "./components/PropertyOverview";
import { useKeycloak } from "@/components/auth/KeycloakProvider";
import { Roles } from "@/components/auth/Roles";
import PropertyUpdateOverview from "./components/property-update-overview/PropertyUpdateOverview";
import {
  deleteRealEstate,
  getFilteredRealEstates,
  getRealEstateById,
} from "@/api/real-estates";
import ControlButtons from "@/components/common/ControlButtons";
import { realEstateQueryKeys } from "@/components/utils/queryFactory";
import { useTranslation } from "react-i18next";
import EmptyDocument from "../../assets/empty-document.svg?react";
import Loader from "@/components/ui/loader/Loaders";

const PropertyList = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const [selectedProperty, setSelectedProperty] = useState<RealEstate>();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { hasRole } = useKeycloak();

  const { data: loadedProperty } = useQuery({
    queryKey: realEstateQueryKeys.realEstateById(Number(id)),
    queryFn: async () => await getRealEstateById(id ?? ""),
    enabled: id !== undefined,
  });

  useEffect(() => {
    if (id !== undefined && loadedProperty !== selectedProperty) {
      setSelectedProperty(loadedProperty);
    }
  }, [id, loadedProperty, selectedProperty]);
  const { data, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: realEstateQueryKeys.allRealEstates,
    initialPageParam: 0,
    queryFn: async ({ pageParam }) =>
      await getFilteredRealEstates({
        ...Object.fromEntries(searchParams),
        ...(Object.fromEntries(searchParams)?.districts
          ? {
              districts: Object.fromEntries(searchParams)?.districts.split(","),
            }
          : {}),
        page: pageParam,
        size: 5,
      }).then((data) => {
        if (
          (selectedProperty?.id === realEstates[0]?.id &&
            selectedProperty !== realEstates[0]) ||
          !selectedProperty
        ) {
          setSelectedProperty(data.content?.[0]);
        }
        return data;
      }),
    getNextPageParam: (response) => {
      const nextPage = response.pageable.pageNumber + 1;
      if (nextPage >= response.totalPages) return;

      return nextPage;
    },
  });
  const deletePropertyMutation = useMutation({
    mutationFn: async () => {
      if (selectedProperty?.id) {
        await deleteRealEstate(selectedProperty.id);
        await queryClient.invalidateQueries({
          queryKey: realEstateQueryKeys.allRealEstates,
        });
      }
    },
  });

  const scrollableRef = useRef<HTMLDivElement>(null);
  const realEstates = useMemo(
    () => data?.pages.flatMap((p) => p.content) ?? [],
    [data]
  );

  return (
    <div className="w-full flex flex-row">
      {id === undefined && (
        <div
          ref={scrollableRef}
          onScroll={() => {
            if (scrollableRef.current) {
              const { scrollTop, clientHeight, scrollHeight } =
                scrollableRef.current;
              if (scrollTop + clientHeight >= scrollHeight - 20) {
                fetchNextPage();
              }
            }
          }}
          className="flex flex-col overflow-auto p-2 pt-0 gap-2 scrollable w-[650px]"
        >
          {hasRole([Roles.ADMIN]) && (
            <ControlButtons
              onDelete={() =>
                deletePropertyMutation
                  .mutateAsync()
                  .then(() => setSelectedProperty(undefined))
              }
              isDisabled={!selectedProperty}
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
          {realEstates.length ? (
            realEstates.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onPreview={() => {
                  setSelectedProperty(property);
                  setIsAdding(false);
                  setIsEditing(false);
                }}
              />
            ))
          ) : (
            <div className="border rounded p-4 text-center mt-4">
              {t("emptyResultProperties")}
            </div>
          )}
        </div>
      )}
      {selectedProperty || realEstates.length ? (
        <div className="flex p-4 flex-auto w-full overflow-hidden">
          {!isAdding && !isEditing && selectedProperty && (
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
              onUpdate={(property: RealEstate) => setSelectedProperty(property)}
              isEditing
            />
          )}
        </div>
      ) : isFetching ? (
        <div className="flex w-full h-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="border rounded flex items-center justify-center flex-auto m-4">
          <EmptyDocument className="w-72" />
        </div>
      )}
    </div>
  );
};

export default PropertyList;
