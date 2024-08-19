package com.realtor.app.image.service;

import com.realtor.app.image.model.Image;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ImageService {
    public Image saveImage(Image image);
    public Image updateImage(Image image);
    public List<Image> getAllImages();
    public List<Image> getAllImagesByBuildingId(Long buildingId);
    public List<Image> getAllImagesByRealEstateId(Long realEstateId);
    public Optional<Image> getMainImageByBuildingId(Long buildingId);
    public Optional<Image> getMainImageByPropertyId(Long propertyId);
    public ResponseEntity<Void> deleteImage(UUID imageId);
}
