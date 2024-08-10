import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import usePagination from "@/hooks/usePagination";
import PaginationComponent from "@/components/common/PaginationComponent";
import { getPaginatedBuildings } from "@/api/buildings";

const Projects = () => {
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
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-auto grid grid-cols-3 gap-12 p-9">
        {data?.content.map((building) => (
          <ProjectCard key={building.id} building={building} />
        ))}
      </div>
      <PaginationComponent
        onNext={incrementPage}
        onPrevious={decrementPage}
        currentPage={page}
        totalPages={totalPages}
        onSelectedPage={(page: number) => setPage(page)}
      />
    </div>
  );
};

export default Projects;
