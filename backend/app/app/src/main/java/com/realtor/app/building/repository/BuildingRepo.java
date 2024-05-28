package com.realtor.app.building.repository;

import com.realtor.app.building.model.Building;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface BuildingRepo extends JpaRepository<Building, Integer>, JpaSpecificationExecutor<Building> {
}
