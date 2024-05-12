package com.realtor.app.service;

import com.realtor.app.model.Building;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BuildingService {
    public Building saveBuilding(Building building);

    public Page<Building> getAllBuildings(Pageable pageable);

    public Page<Building> getAllFilteredBuildings(int startYear, int endYear, int city_id, Pageable pageable);
    public Page<Building> getAllFilteredBuildings(int cityId, Pageable pageable);
}
