import PaginationComponent from "@/components/common/PaginationComponent";
import ProjectCard from "../ProjectCard";
import { Dispatch, SetStateAction } from "react";
import { Building } from "@/models/Building";
import { PaginatedData } from "@/models/PaginatedData";

const PaginatedBuildings = ({
  onBuildingSelect,
  incrementPage,
  decrementPage,
  page,
  totalPages,
  setPage,
  paginatedBuildings,
}: {
  onBuildingSelect: (building: Building) => void;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  decrementPage: () => void;
  incrementPage: () => void;
  totalPages: number;
  paginatedBuildings: PaginatedData<Building> | undefined;
}) => {
  return (
    <>
      <div className="w-full flex flex-auto justify-around gap-12 p-9 overflow-hidden">
        {paginatedBuildings?.content.map((building) => (
          <ProjectCard
            key={building.id}
            building={building}
            onSelect={onBuildingSelect}
          />
        ))}
      </div>
      <PaginationComponent
        onNext={incrementPage}
        onPrevious={decrementPage}
        currentPage={page}
        totalPages={totalPages}
        onSelectedPage={(page: number) => setPage(page)}
      />
    </>
  );
};

export default PaginatedBuildings;
