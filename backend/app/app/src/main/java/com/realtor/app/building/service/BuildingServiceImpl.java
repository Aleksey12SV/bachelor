package com.realtor.app.building.service;

import com.realtor.app.building.model.Building;
import com.realtor.app.building.repository.BuildingRepo;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.realtor.app.building.model.specifications.BuildingSpecification.getBuildingsInCity;
import static com.realtor.app.building.model.specifications.BuildingSpecification.hasYearInRange;

@Service
public class BuildingServiceImpl implements BuildingService {
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private BuildingRepo buildingRepo;
    @Override
    public Building saveBuilding(Building building){
        return buildingRepo.save(building);
    }

    @Override
    public List<Building> getAllBuildings(){
        return buildingRepo.findAll();
    }

    @Override
    public Page<Building> getAllBuildingsPaginated(Pageable pageable){
        return buildingRepo.findAll(pageable);
    }

    @Override
    public Page<Building> getAllFilteredBuildings(int startYear, int endYear, int city_id, Pageable pageable){
        return buildingRepo.findAll(hasYearInRange(startYear,endYear), pageable);
    }
    public Page<Building> getAllFilteredBuildings(int city_id, Pageable pageable){
        return buildingRepo.findAll(getBuildingsInCity(city_id), pageable);
    }
}
