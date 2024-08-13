package com.realtor.app.real_estate.repository;

import com.realtor.app.real_estate.model.RealEstate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RealEstateRepo extends JpaRepository<RealEstate, Integer> {
    @Query("SELECT r FROM RealEstate r WHERE r.id IN (SELECT i.realEstate.id FROM Image i)")
    List<RealEstate> findAllWithImages();

    @Query("SELECT r FROM RealEstate r JOIN r.sellers s WHERE s.id = :sellerId")
    List<RealEstate> findBySellerId(@Param("sellerId") int sellerId);
}
