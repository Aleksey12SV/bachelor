package com.realtor.app.real_estate.repository;

import com.realtor.app.real_estate.model.RealEstate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RealEstateRepo extends JpaRepository<RealEstate, Integer> {
}
