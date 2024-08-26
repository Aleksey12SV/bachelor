package com.realtor.app.image.model;

import com.realtor.app.building.model.Building;
import com.realtor.app.real_estate.model.RealEstate;
import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
@Table(name = "images")
public class Image {
    @Id
    @Column (nullable = false, updatable = false, unique = true, name = "id")
    private UUID id;

    @Column (name = "description")
    private String description;

    @Column (name = "height")
    private int height;

    @Column (name = "width")
    private int width;

    @Column (name = "is_main_image")
    private boolean mainImage;

    @Column (name = "image")
    @Lob
    private byte[] image;

    @ManyToOne
    @JoinColumn (name = "building_id")
    private Building building;

    @ManyToOne
    @JoinColumn (name = "property_id")
    private RealEstate realEstate;

    public Image() {
    }

    public Image(UUID id, String description, byte[] imageBlob, RealEstate realEstate, Building building, boolean mainImage, int height, int width) {
        this.id = id;
        this.description = description;
        this.image = imageBlob;
        this.realEstate = realEstate;
        this.building = building;
        this.mainImage = mainImage;
        this.height = height;
        this.width = width;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public Building getBuilding() {
        return building;
    }

    public void setBuilding(Building building) {
        this.building = building;
    }

    public RealEstate getRealEstate() {
        return realEstate;
    }

    public void setRealEstate(RealEstate realEstate) {
        this.realEstate = realEstate;
    }

    public Boolean getMainImage() {
        return mainImage;
    }

    public void setMainImage(Boolean mainImage) {
        this.mainImage = mainImage;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }
}
