import { axiosInstance } from "@/lib/axios";
import { PaginatedData } from "@/models/PaginatedData";
import { RealEstate } from "@/models/RealEstate";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import PropertyCard from "./components/PropertyCard";
import { useSearchParams } from "react-router-dom";
import { FormType } from "../home-page/HomePage";

const getFilteredProperties = (
  filters: Partial<FormType & { page: number; size: number }>
): Promise<PaginatedData<RealEstate>> =>
  axiosInstance.post(`real-estate/filtered`, filters).then(({ data }) => data);

const PropertyList = () => {
  const [height, setHeight] = useState<number>();
  const [selectedProperty, setSelectedProperty] = useState<RealEstate>();
  const [searchParams] = useSearchParams();
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
    <div className="h-full w-full grid grid-cols-[2fr_3fr]">
      <div
        ref={scrollableRef}
        className="flex flex-col overflow-auto p-2 gap-2"
        style={{ height }}
      >
        {realEstates.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onPreview={() => setSelectedProperty(property)}
          />
        ))}
        {isFetching && <p>Loading...</p>}
      </div>
      <div className="w-full h-full">{selectedProperty?.building.year}</div>
    </div>
  );
};

export default PropertyList;
