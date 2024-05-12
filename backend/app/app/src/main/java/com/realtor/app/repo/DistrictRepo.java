package com.realtor.app.repo;

import com.realtor.app.model.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DistrictRepo extends JpaRepository<District, Integer> {
    @Query(value = "SELECT * FROM districts d WHERE d.city_id = :city_id ORDER BY d.name", nativeQuery = true)
    List<District> getDistrictsByCityId(Integer city_id);
}
