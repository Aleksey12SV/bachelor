import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { deleteBuilding } from "@/api/buildings";
import { useKeycloak } from "@/components/auth/KeycloakProvider";
import { Roles } from "@/components/auth/Roles";
import PropertyControls from "../property-list/components/PropertyControls";
import { Building } from "@/models/Building";
import PaginatedBuildings from "./components/PaginatedBuildings";
import BuildingUpdateOverview from "./components/BuildingUpdateOverview";

const Projects = () => {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<Building>();
  const { hasRole } = useKeycloak();

  const deletePropertyMutation = useMutation({
    mutationFn: async () => {
      if (selectedBuilding?.id) {
        await deleteBuilding(selectedBuilding.id);
        await queryClient.invalidateQueries({ queryKey: ["buildings"] });
      }
    },
  });

  return (
    <div className="w-full flex flex-col">
      {hasRole([Roles.ADMIN]) && (
        <PropertyControls
          onDelete={() => deletePropertyMutation.mutateAsync()}
          hasSelectedProperty={!!selectedBuilding}
          onAdd={() => {
            setIsEditing(false);
            setIsAdding(true);
            setSelectedBuilding(undefined);
          }}
          onEdit={() => {
            setIsEditing(true);
            setIsAdding(false);
          }}
        />
      )}
      {!isEditing && !isAdding && (
        <PaginatedBuildings
          onBuildingSelect={(building) => setSelectedBuilding(building)}
        />
      )}
      {isEditing ||
        (isAdding && <BuildingUpdateOverview building={undefined} />)}
    </div>
  );
};

export default Projects;
