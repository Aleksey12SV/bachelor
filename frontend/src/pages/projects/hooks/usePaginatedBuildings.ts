import { getPaginatedBuildings } from "@/api/buildings";
import { buildingQueryKeys } from "@/components/utils/queryFactory";
import usePagination from "@/hooks/usePagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const usePaginatedBuildings = () => {
  const [totalPages, setTotalPages] = useState(0);
  const { page, setPage, decrementPage, incrementPage } =
    usePagination(totalPages);
  const { data } = useQuery({
    queryKey: buildingQueryKeys.paginatedBuildings(page),
    queryFn: async () => await getPaginatedBuildings(page, 3),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data?.totalPages) {
      setTotalPages(data?.totalPages);
    }
  }, [data?.totalPages]);

  return {
    page,
    setPage,
    decrementPage,
    incrementPage,
    totalPages,
    paginatedBuildings: data,
  };
};

export default usePaginatedBuildings;
