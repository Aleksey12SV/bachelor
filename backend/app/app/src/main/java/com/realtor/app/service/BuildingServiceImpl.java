package com.realtor.app.service;

import com.realtor.app.model.Building;
import com.realtor.app.model.City;
import com.realtor.app.repo.BuildingRepo;
import com.realtor.app.repo.CityRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.realtor.app.model.specifications.BuildingSpecification.getBuildingsInCity;
import static com.realtor.app.model.specifications.BuildingSpecification.hasYearInRange;

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
    public Page<Building> getAllBuildings(Pageable pageable){
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
