export const buildingQueryKeys = {
  allBuildings: ["buildings"],
  paginatedBuildings: (page: number) => ["buildings", "page", page],
};

export const imageQueryKeys = {
  allImages: ["images"],
  allBuildingImages: (id: number) => ["images", "building", id],
  allRealEstateImages: (id: number) => ["images", "realEstate", id],
  realEstateMainImage: (id: number) => ["images", "realEstate", "main", id],
};

export const citiesQueryKeys = {
  allCities: ["cities"],
};

export const districtsQueryKeys = {
  allDistricts: ["districts"],
};

export const sellersQueryKeys = {
  allSellers: ["sellers"],
};

export const propertyTypesQueryKeys = {
  allPropertyTypes: ["propertyTypes"],
};

export const realEstateQueryKeys = {
  allRealEstates: ["realEstates"],
  paginatedRealEstates: (page: number) => ["realEstates", "page", page],
  realEstateById: (id: number) => ["realEstates", id],
};
