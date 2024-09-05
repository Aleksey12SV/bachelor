package com.realtor.app.image.service;

import com.realtor.app.image.model.Image;
import com.realtor.app.image.repository.ImageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ImageServiceImpl implements ImageService {
    @Autowired
    private ImageRepo imageRepo;
    @Override
    public Image saveImage(Image image){
        return imageRepo.save(image);
    }

    @Override
    public Image updateImage (Image image){
        Optional<Image> existingImageOpt = imageRepo.findById(image.getId());
        if (existingImageOpt.isPresent()) {
            Image existingImage = existingImageOpt.get();
            existingImage.setDescriptionBG(image.getDescriptionBG());
            existingImage.setDescriptionEN(image.getDescriptionEN());
            existingImage.setMainImage(image.getMainImage());
            return imageRepo.save(existingImage);
        }
        throw new Error("Image not found");
    }

    @Override
    public List<Image> getAllImages() {
        return imageRepo.findAll();
    }

    @Override
    public List<Image> getRealEstateImages(){
        return imageRepo.findByRealEstateIsNotNull();
    }
    @Override
    public List<Image> getTopImages() {
        List<Image> realEstateImages = getRealEstateImages();
        Map<Integer, Image> topPropertyImages = realEstateImages.stream()
                .filter(image -> image.getRealEstate() != null && image.getRealEstate().isTopProperty())
                .collect(Collectors.toMap(
                        image -> image.getRealEstate().getId(),
                        image -> image,
                        (existing, replacement) -> existing.getMainImage() ? existing : replacement
                ));

        return topPropertyImages.values().stream().collect(Collectors.toList());
    }

    @Override
    public Page<Image> getImagesPaginated(Pageable pageable){
        return imageRepo.findAll(pageable);
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
        Optional<Image> foundImage = imageRepo.findByBuildingIdAndMainImageTrue(buildingId);
        if(foundImage != null) return foundImage;
        List<Image> allBuildingImages = imageRepo.getAllImagesByBuildingId(buildingId);
        if(allBuildingImages.isEmpty()){
            return null;
        }
        return Optional.ofNullable(imageRepo.getAllImagesByBuildingId(buildingId).get(0));
    }

    @Override
    public Optional<Image> getMainImageByPropertyId(Long propertyId){
        Optional<Image> foundImage = imageRepo.findByRealEstateIdAndMainImageTrue(propertyId);
        if(foundImage.isPresent()) return foundImage;
        return Optional.ofNullable(imageRepo.getAllImagesByRealEstateId(propertyId).get(0));
    }

    @Override
    public ResponseEntity<Void> deleteImage(UUID imageId){
        if(imageRepo.existsById(imageId)) {
            imageRepo.deleteById(imageId);
            return ResponseEntity.noContent().build();
        }
        return (ResponseEntity<Void>) ResponseEntity.notFound();
    }
}
