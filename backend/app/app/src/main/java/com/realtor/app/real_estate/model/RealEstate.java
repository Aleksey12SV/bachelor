package com.realtor.app.real_estate.model;

import com.realtor.app.building.model.Building;
import com.realtor.app.property_type.model.PropertyType;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "real_estates")
public class RealEstate {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    @Column (name = "id")
    private int id;

    @OneToOne
    @JoinColumn
    private Building building;

    @ManyToOne
    @JoinColumn (name = "property_type_id")
    private PropertyType propertyType;

    @Column (name = "price")
    private float price;

    @Column (name = "size")
    private float size;
    public RealEstate() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Building getBuilding() {
        return building;
    }

    public void setBuilding(Building building) {
        this.building = building;
    }

    public PropertyType getPropertyType() {
        return propertyType;
    }

    public void setPropertyType(PropertyType propertyType) {
        this.propertyType = propertyType;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public float getSize() {
        return size;
    }

    public void setSize(float size) {
        this.size = size;
    }
}
