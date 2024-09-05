import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { deleteBuilding } from "@/api/buildings";
import { useKeycloak } from "@/components/auth/KeycloakProvider";
import { Roles } from "@/components/auth/Roles";
import { Building } from "@/models/Building";
import PaginatedBuildings from "./components/PaginatedBuildings";
import BuildingUpdateOverview from "./components/BuildingUpdateOverview";
import ControlButtons from "@/components/common/ControlButtons";
import { buildingQueryKeys } from "@/components/utils/queryFactory";
import usePaginatedBuildings from "./hooks/usePaginatedBuildings";

const Projects = () => {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<Building>();
  const { hasRole } = useKeycloak();
  const {
    page,
    setPage,
    decrementPage,
    incrementPage,
    totalPages,
    paginatedBuildings,
  } = usePaginatedBuildings();

  const deletePropertyMutation = useMutation({
    mutationFn: async () => {
      if (selectedBuilding?.id) {
        await deleteBuilding(selectedBuilding.id);
        await queryClient.invalidateQueries({
          queryKey: buildingQueryKeys.allBuildings,
        });
        setSelectedBuilding(undefined);
      }
    },
  });

  return (
    <div className="w-full flex flex-col p-4 gap-4">
      {hasRole([Roles.ADMIN]) && (
        <ControlButtons
          onDelete={() => deletePropertyMutation.mutateAsync()}
          isDisabled={!selectedBuilding}
          onAdd={() => {
            setIsEditing(false);
            setIsAdding(true);
            setSelectedBuilding(undefined);
          }}
          onEdit={() => {
            setIsEditing(true);
            setIsAdding(false);
          }}
          onClose={
            isAdding || isEditing
              ? () => {
                  setIsAdding(false);
                  setIsEditing(false);
                }
              : undefined
          }
        />
      )}
      {!isEditing && !isAdding && (
        <PaginatedBuildings
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          decrementPage={decrementPage}
          incrementPage={incrementPage}
          paginatedBuildings={paginatedBuildings}
          onBuildingSelect={(building) => setSelectedBuilding(building)}
        />
      )}
      {(isEditing || isAdding) && (
        <BuildingUpdateOverview
          page={page}
          building={selectedBuilding}
          onSubmit={() => {
            setIsAdding(false);
            setIsEditing(false);
            setSelectedBuilding(undefined)
          }}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default Projects;
