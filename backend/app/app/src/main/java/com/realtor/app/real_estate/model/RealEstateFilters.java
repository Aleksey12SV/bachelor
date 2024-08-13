package com.realtor.app.real_estate.model;

import java.util.List;

public class RealEstateFilters {
    private String location;
    private String heating;
    private String status;
    private Double priceFrom;
    private Double priceTo;
    private Double priceFromSqM;
    private Double priceToSqM;
    private Double minSize;
    private Double maxSize;
    private Integer minFloor;
    private Integer maxFloor;
    private List<String> propertyTypes;
    private Boolean showRealEstatesWithoutImages = true;
    private String sorting;
    private Integer page = 0;
    private Integer size = 10;

    public String getSeller() {
        return seller;
    }

    public void setSeller(String seller) {
        this.seller = seller;
    }

    private String seller;

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getPriceFrom() {
        return priceFrom;
    }

    public void setPriceFrom(Double priceFrom) {
        this.priceFrom = priceFrom;
    }

    public Double getPriceTo() {
        return priceTo;
    }

    public void setPriceTo(Double priceTo) {
        this.priceTo = priceTo;
    }

    public Double getMinSize() {
        return minSize;
    }

    public void setMinSize(Double minSize) {
        this.minSize = minSize;
    }

    public Double getMaxSize() {
        return maxSize;
    }

    public void setMaxSize(Double maxSize) {
        this.maxSize = maxSize;
    }

    public Integer getMinFloor() {
        return minFloor;
    }

    public void setMinFloor(Integer minFloor) {
        this.minFloor = minFloor;
    }

    public Integer getMaxFloor() {
        return maxFloor;
    }

    public void setMaxFloor(Integer maxFloor) {
        this.maxFloor = maxFloor;
    }

    public List<String> getPropertyTypes() {
        return propertyTypes;
    }

    public void setPropertyTypes(List<String> propertyTypes) {
        this.propertyTypes = propertyTypes;
    }

    public Boolean getShowRealEstatesWithoutImages() {
        return showRealEstatesWithoutImages;
    }

    public void setShowRealEstatesWithoutImages(Boolean showRealEstatesWithoutImages) {
        this.showRealEstatesWithoutImages = showRealEstatesWithoutImages;
    }

    public String getSorting() {
        return sorting;
    }

    public void setSorting(String sorting) {
        this.sorting = sorting;
    }

    public Double getPriceFromSqM() {
        return priceFromSqM;
    }

    public void setPriceFromSqM(Double priceFromSqM) {
        this.priceFromSqM = priceFromSqM;
    }

    public Double getPriceToSqM() {
        return priceToSqM;
    }

    public void setPriceToSqM(Double priceToSqM) {
        this.priceToSqM = priceToSqM;
    }

    public String getHeating() {
        return heating;
    }

    public void setHeating(String heating) {
        this.heating = heating;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
