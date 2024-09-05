export const buildingQueryKeys = {
  allBuildings: ["buildings"],
  paginatedBuildings: (page: number) => ["buildings", "page", page],
};

export const imageQueryKeys = {
  allImages: ["images"],
  allBuildingImages: (id: number) => ["images", "building", id],
  allRealEstateImages: (id: number) => ["images", "realEstate", id],
};

export const citiesQueryKeys = {
  allCities: ["cities"],
};

export const districtsQueryKeys = {
    allDistricts: ["districts"],
  };
  