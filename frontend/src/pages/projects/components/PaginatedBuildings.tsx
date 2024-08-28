import PaginationComponent from "@/components/common/PaginationComponent";
import ProjectCard from "../ProjectCard";
import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPaginatedBuildings } from "@/api/buildings";
import usePagination from "@/hooks/usePagination";
import { Building } from "@/models/Building";

const PaginatedBuildings = ({
  onBuildingSelect,
}: {
  onBuildingSelect: (building: Building) => void;
}) => {
  const [totalPages, setTotalPages] = useState(0);
  const { page, setPage, decrementPage, incrementPage } =
    usePagination(totalPages);
  const { data } = useQuery({
    queryKey: ["buildings", page],
    queryFn: async () => await getPaginatedBuildings(page, 3),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data?.totalPages) {
      setTotalPages(data?.totalPages);
    }
  }, [data?.totalPages]);

  return (
    <>
      <div className="w-full flex flex-auto justify-around gap-12 p-9">
        {data?.content.map((building) => (
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
