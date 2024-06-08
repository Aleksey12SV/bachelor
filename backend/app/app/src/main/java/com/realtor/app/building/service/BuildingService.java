package com.realtor.app.building.service;

import com.realtor.app.building.model.Building;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BuildingService {
    public Building saveBuilding(Building building);
    public List<Building> getAllBuildings();
    public Page<Building> getAllBuildingsPaginated(Pageable pageable);

    public Page<Building> getAllFilteredBuildings(int startYear, int endYear, int city_id, Pageable pageable);
    public Page<Building> getAllFilteredBuildings(int cityId, Pageable pageable);
}
