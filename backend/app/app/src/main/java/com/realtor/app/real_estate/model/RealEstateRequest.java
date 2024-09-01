package com.realtor.app.real_estate.model;

import com.realtor.app.building.model.Building;
import com.realtor.app.seller.model.Seller;
import com.realtor.app.property_type.model.PropertyType;

import java.util.Set;

public class RealEstateRequest {
    private Building building;
    private PropertyType propertyType;
    private String rooms;

    public String getRooms() {
        return rooms;
    }

    public void setRooms(String rooms) {
        this.rooms = rooms;
    }

    private float price;
    private float size;
    private boolean topProperty;
    private int floor;
    private String heating;
    private String descriptionBG;
    private String descriptionEN;
    private String titleBG;
    private String titleEN;
    private String status;

    public Set<Seller> getSellers() {
        return sellers;
    }

    public void setSellers(Set<Seller> sellers) {
        this.sellers = sellers;
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

    public int getFloor() {
        return floor;
    }

    public void setFloor(int floor) {
        this.floor = floor;
    }

    public String getHeating() {
        return heating;
    }

    public void setHeating(String heating) {
        this.heating = heating;
    }

    public boolean isTopProperty() {
        return topProperty;
    }

    public void setTopProperty(boolean topProperty) {
        this.topProperty = topProperty;
    }

    public String getDescriptionBG() {
        return descriptionBG;
    }

    public void setDescriptionBG(String descriptionBG) {
        this.descriptionBG = descriptionBG;
    }

    public String getDescriptionEN() {
        return descriptionEN;
    }

    public void setDescriptionEN(String descriptionEN) {
        this.descriptionEN = descriptionEN;
    }

    public String getTitleBG() {
        return titleBG;
    }

    public void setTitleBG(String titleBG) {
        this.titleBG = titleBG;
    }

    public String getTitleEN() {
        return titleEN;
    }

    public void setTitleEN(String titleEN) {
        this.titleEN = titleEN;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    private Set<Seller> sellers;
}
