package com.realtor.app.image.controller;

import com.realtor.app.building.model.Building;
import com.realtor.app.building.service.BuildingService;
import com.realtor.app.image.model.Image;
import com.realtor.app.real_estate.model.RealEstate;
import com.realtor.app.image.service.ImageService;
import com.realtor.app.real_estate.service.RealEstateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;
import java.util.Optional;

class ImageRequest {
    private String image64;
    private String description;
    private Boolean isMainImage;

    private int propertyId;
    private int buildingId;

    public int getBuildingId() {
        return buildingId;
    }

    public void setBuildingId(int buildingId) {
        this.buildingId = buildingId;
    }

    public String getImage64() {
        return image64;
    }

    public void setImage64(String image64) {
        this.image64 = image64;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(int propertyId) {
        this.propertyId = propertyId;
    }

    public Boolean getIsMainImage() {
        return Boolean.TRUE.equals(isMainImage);
    }

    public void setIsMainImage(Boolean isMainImage) {
        this.isMainImage = isMainImage;
    }
}

@RestController
@RequestMapping("/image")
public class ImageController {
    @Autowired
    private ImageService imageService;

    @Autowired
    private RealEstateService realEstateService;

    @Autowired
    private BuildingService buildingService;

    @PostMapping("/add")
//    @PreAuthorize("hasRole('ADMIN')")
    public String add(@RequestBody ImageRequest imageRequest){
        byte[] imageBlob = Base64.getDecoder().decode((extractBase64String(imageRequest.getImage64())));
        RealEstate property = realEstateService.getAllProperties().stream().filter(p -> p.getId() == imageRequest.getPropertyId()).findFirst().orElse(null);
        Building building = buildingService.getAllBuildings().stream().filter(p -> p.getId() == imageRequest.getBuildingId()).findFirst().orElse(null);
        if(property == null && building == null) { throw new Error("Both property and building null"); }
        if(imageRequest.getIsMainImage() && building != null){
            if(imageService.getMainImageByBuildingId((long) building.getId()).isPresent()){
                throw new Error("Main image was already saved");
            };
        }
        Image imageToSave = new Image(imageRequest.getDescription(), imageBlob, property, building, imageRequest.getIsMainImage());
        imageService.saveImage(imageToSave);
        return "New Image is saved";
    }

    @GetMapping("/getAll")
    public List<Image> getAllImages(){
        return imageService.getAllImages();
    }

    @GetMapping("/getAll/building/{buildingId}")
    public List<Image> getAllImagesByBuildingId(@PathVariable Long buildingId) {
        return imageService.getAllImagesByBuildingId(buildingId);
    }

    @GetMapping("/getAll/property/{propertyId}")
    public List<Image> getAllImagesByPropertyId(@PathVariable Long propertyId) {
        return imageService.getAllImagesByRealEstateId(propertyId);
    }

    @GetMapping("main/building/{buildingId}")
    public Optional<Image> getMainImageByBuildingId(@PathVariable Long buildingId) {
        return imageService.getMainImageByBuildingId(buildingId);
    }

    @GetMapping("main/real-estate/{propertyId}")
    public Optional<Image> getMainImageByPropertyId(@PathVariable Long propertyId) {
        return imageService.getMainImageByPropertyId(propertyId);
    }

    private String extractBase64String(String base64Image) {
        if (base64Image.contains(",")) {
            return base64Image.split(",")[1];
        }
        return base64Image;
    }
}
