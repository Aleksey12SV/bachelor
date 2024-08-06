package com.realtor.app.image.service;

import com.realtor.app.image.model.Image;

import java.util.List;
import java.util.Optional;

public interface ImageService {
    public Image saveImage(Image city);
    public List<Image> getAllImages();
    public List<Image> getAllImagesByBuildingId(Long buildingId);
    public List<Image> getAllImagesByRealEstateId(Long realEstateId);
    public Optional<Image> getMainImageByBuildingId(Long buildingId);
    public Optional<Image> getMainImageByPropertyId(Long propertyId);
    public boolean deleteImage(Integer imageId);
}
