package com.realtor.app.seller.model;

import java.util.List;

public class SellerSalesDTO {
    private Long sellerId;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private List<String> saleIds;

    public SellerSalesDTO(Long sellerId, String firstName, String lastName, String phoneNumber, List<String> saleIds) {
        this.sellerId = sellerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.saleIds = saleIds;
    }

    public Long getSellerId() {
        return sellerId;
    }

    public void setSellerId(Long sellerId) {
        this.sellerId = sellerId;
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

    public List<String> getSaleIds() {
        return saleIds;
    }

    public void setSaleIds(List<String> saleIds) {
        this.saleIds = saleIds;
    }

    // Getters and setters...
}
