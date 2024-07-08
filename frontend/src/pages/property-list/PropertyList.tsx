import { axiosInstance } from "@/lib/axios";
import { PaginatedData } from "@/models/PaginatedData";
import { RealEstate } from "@/models/RealEstate";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import PropertyCard from "./components/PropertyCard";

const getProperties = (
  page: number,
  size: number
): Promise<PaginatedData<RealEstate>> =>
  axiosInstance
    .get(`real-estate/getAll/paginated?page=${page}&size=${size}`)
    .then(({ data }) => data);

const PropertyList = () => {
  const [height, setHeight] = useState<number>();
  const { data, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: ["real-estates"],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => await getProperties(pageParam, 5),
    getNextPageParam: (response) => {
      const nextPage = response.pageable.pageNumber + 1;
      if (nextPage >= response.totalPages) return;
      return response.pageable.pageNumber + 1;
    },
  });
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      setHeight(entry.target.clientHeight);
    });
    const mainContainer = document.querySelector("#main-container");
    if (mainContainer) {
      resizeObserver.observe(mainContainer);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const scrollableRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (scrollableRef.current) {
        console.log("scroll");
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
  const realEstates = data?.pages.flatMap((p) => p.content) ?? [];

  return (
    <div className="h-full w-full grid grid-cols-2">
      <div
        ref={scrollableRef}
        className="flex flex-col overflow-auto p-2 gap-2"
        style={{ height }}
      >
        {realEstates.map((property) => (
          <PropertyCard property={property} />
        ))}
        {isFetching && <p>Loading...</p>}
      </div>
      <div className="w-full h-full bg-red-500"></div>
    </div>
  );
};

export default PropertyList;
