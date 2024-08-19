package com.realtor.app.image.repository;

import com.realtor.app.image.model.Image;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ImageRepo extends JpaRepository<Image, UUID> {
    Optional<Image> findById(UUID imageId);
    List<Image> getAllImagesByBuildingId(Long buildingId);
    List<Image> getAllImagesByRealEstateId(Long realEstateId);
    Optional<Image> findByBuildingIdAndMainImageTrue(Long buildingId);
    Optional<Image> findByRealEstateIdAndMainImageTrue(Long propertyId);
    @Transactional
    void deleteByRealEstateId(Integer realEstateId);
}
