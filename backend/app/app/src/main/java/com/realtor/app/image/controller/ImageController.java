package com.realtor.app.image.controller;

import com.realtor.app.building.model.Building;
import com.realtor.app.building.service.BuildingService;
import com.realtor.app.image.model.Image;
import com.realtor.app.real_estate.model.RealEstate;
import com.realtor.app.image.service.ImageService;
import com.realtor.app.real_estate.service.RealEstateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;

class ImageRequest {
    private String image64;
    private String description;

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
    public String add(@RequestBody ImageRequest imageRequest){
        byte[] imageBlob = Base64.getDecoder().decode((imageRequest.getImage64()));
        RealEstate property = realEstateService.getAllProperties().stream().filter(p -> p.getId() == imageRequest.getPropertyId()).findFirst().orElse(null);
        Building building = buildingService.getAllBuildings().stream().filter(p -> p.getId() == imageRequest.getBuildingId()).findFirst().orElse(null);
        if(property == null && building == null) { throw new Error("Both property and building null"); }
        Image imageToSave = new Image(imageRequest.getDescription(), imageBlob, property, building);
        imageService.saveImage(imageToSave);
        return "New Image is saved";
    }

    @GetMapping("/getAll")
    public List<Image> getAllImages(){
        return imageService.getAllImages();
    }

    @GetMapping("/getAll/{buildingId}")
    public List<Image> getAllImagesByBuildingId(@PathVariable Long buildingId) {
        return imageService.getAllImagesByBuildingId(buildingId);
    }
}
