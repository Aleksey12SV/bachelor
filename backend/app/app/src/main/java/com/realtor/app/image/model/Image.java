package com.realtor.app.image.model;

import com.realtor.app.building.model.Building;
import com.realtor.app.real_estate.model.RealEstate;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "images")
public class Image {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    @Column (name = "id")
    private int id;

    @Column (name = "description")
    private String description;

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

    public Image(String description, byte[] imageBlob, RealEstate realEstate, Building building) {
        this.description = description;
        this.image = imageBlob;
        this.realEstate = realEstate;
        this.building = building;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
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
}
