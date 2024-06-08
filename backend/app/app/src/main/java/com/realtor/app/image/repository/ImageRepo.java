package com.realtor.app.image.repository;

import com.realtor.app.image.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepo extends JpaRepository<Image, Integer> {
    List<Image> getAllImagesByBuildingId(Long buildingId);
}
