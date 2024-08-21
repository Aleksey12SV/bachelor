package com.realtor.app.building.service;

import com.realtor.app.building.model.Building;
import com.realtor.app.building.repository.BuildingRepo;
import com.realtor.app.image.repository.ImageRepo;
import com.realtor.app.real_estate.model.RealEstate;
import com.realtor.app.real_estate.repository.RealEstateRepo;
import com.realtor.app.real_estate.service.RealEstateService;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
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
    private RealEstateRepo realEstateRepo;
    @Autowired
    private RealEstateService realEstateService;
    @Autowired
    private ImageRepo imageRepo;
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

    @Override
    @Transactional
    public void deleteBuilding(Integer buildingId){
        imageRepo.deleteByRealEstateId(buildingId);
        List<RealEstate> propertiesInBuilding = realEstateRepo.findByBuildingId(buildingId);
        propertiesInBuilding.forEach(property -> realEstateService.deleteRealEstate(property.getId()));
        buildingRepo.deleteById(buildingId);
    }

    @Override
    public Building updateBuilding(Integer buildingId, Building building){
        return buildingRepo.save(building);
    }
}
