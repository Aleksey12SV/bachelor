package com.realtor.app.image.service;

import com.realtor.app.image.model.Image;
import com.realtor.app.image.repository.ImageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImageServiceImpl implements ImageService {
    @Autowired
    private ImageRepo imageRepo;
    @Override
    public Image saveImage(Image image){
        return imageRepo.save(image);
    }

    @Override
    public List<Image> getAllImages() {
        return imageRepo.findAll();
    }

    @Override
    public List<Image> getAllImagesByBuildingId(Long buildingId) {
        return imageRepo.getAllImagesByBuildingId(buildingId);
    }

    @Override
    public List<Image> getAllImagesByRealEstateId(Long propertyId) {
        return imageRepo.getAllImagesByRealEstateId(propertyId);
    }

    @Override
    public Optional<Image> getMainImageByBuildingId(Long buildingId){
        return imageRepo.findByBuildingIdAndMainImageTrue(buildingId);
    }

    @Override
    public Optional<Image> getMainImageByPropertyId(Long buildingId){
        return imageRepo.findByRealEstateIdAndMainImageTrue(buildingId);
    }

    @Override
    public boolean deleteImage(Integer imageId){
        if(imageRepo.existsById(imageId)) {
            imageRepo.deleteById(imageId);
            return true;
        }
        return false;
    }
}
