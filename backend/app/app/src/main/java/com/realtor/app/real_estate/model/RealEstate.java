package com.realtor.app.real_estate.model;

import com.realtor.app.building.model.Building;
import com.realtor.app.property_type.model.PropertyType;
import com.realtor.app.seller.model.Seller;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Entity
@Data
@Table(name = "real_estates")
public class RealEstate {
    public Set<Seller> getSellers() {
        return sellers;
    }

    public void setSellers(Set<Seller> sellers) {
        this.sellers = sellers;
    }

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

    @Column (name = "property_size")
    private float size;

    @Column (name = "floor")
    private int floor;

    @Column (name = "title")
    private String title;

    public String getRooms() {
        return rooms;
    }

    public void setRooms(String rooms) {
        this.rooms = rooms;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Column (name = "rooms")
    private String rooms;

    @Column (name = "heating")
    private String heating;

    @Column (name = "description")
    private String description;

    @Column (name = "publish_date")
    private Date publishDate;

    @Column (name = "status")
    private String status;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "real_estates_sellers", joinColumns = @JoinColumn(name = "real_estate_id"),
            inverseJoinColumns = @JoinColumn(name = "seller_id"))
    private Set<Seller> sellers;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getPublishDate() {
        return publishDate;
    }

    public void setPublishDate(Date publishDate) {
        this.publishDate = publishDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
