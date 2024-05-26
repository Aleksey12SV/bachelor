package com.realtor.app.repo;

import com.realtor.app.model.RealEstate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RealEstateRepo extends JpaRepository<RealEstate, Integer> {
}
