package com.realtor.app.seller.model;

import com.realtor.app.real_estate.model.RealEstate;
import jakarta.persistence.Column;

import java.util.List;

public class SellerWithAssociatedProperties {
    private int id;

    private String firstName;

    private String lastName;

    private String phoneNumber;

    private List<RealEstate> realEstates;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public List<RealEstate> getRealEstates() {
        return realEstates;
    }

    public void setRealEstates(List<RealEstate> realEstates) {
        this.realEstates = realEstates;
    }
}
