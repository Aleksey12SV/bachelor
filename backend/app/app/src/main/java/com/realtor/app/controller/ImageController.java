package com.realtor.app.controller;

import com.realtor.app.model.Image;
import com.realtor.app.model.RealEstate;
import com.realtor.app.service.ImageService;
import com.realtor.app.service.RealEstateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;
import java.util.Optional;

class ImageRequest {
    private String image64;
    private String description;

    private int propertyId;

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
    @PostMapping("/add")
    public String add(@RequestBody ImageRequest imageRequest){
        byte[] imageBlob = Base64.getDecoder().decode((imageRequest.getImage64()));
        RealEstate property = realEstateService.getAllProperties().stream().filter(p -> p.getId() == imageRequest.getPropertyId()).findFirst().orElseThrow();
        Image imageToSave = new Image(imageRequest.getDescription(), imageBlob, property);
        imageService.saveImage(imageToSave);
        return "New Image is saved";
    }

    @GetMapping("/getAll")
    public List<Image> getAllImages(){
        return imageService.getAllImages();
    }
}
