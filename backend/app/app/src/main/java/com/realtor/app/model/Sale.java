package com.realtor.app.model;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Blob;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "sales")
public class Sale {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    @Column (name = "id")
    private int id;

    @Column (name = "sale_date")
    private LocalDate saleDate;

    @Enumerated(EnumType.STRING)
    @Column (name = "status")
    private Status status;

    @Column (name = "sale_price")
    private Float salePrice;

    @ManyToOne
    @JoinColumn (name = "real_estate_id")
    private RealEstate realEstate;

    public Sale() {
    }

    public Sale(LocalDate saleDate, Status status, Float salePrice, RealEstate realEstate){
        this.saleDate = saleDate;
        this.status = status;
        this.salePrice = salePrice;
        this.realEstate = realEstate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDate getSaleDate() {
        return saleDate;
    }

    public void setSaleDate(LocalDate saleDate) {
        this.saleDate = saleDate;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Float getSalePrice() {
        return salePrice;
    }

    public void setSalePrice(Float salePrice) {
        this.salePrice = salePrice;
    }

    public RealEstate getRealEstate() {
        return realEstate;
    }

    public void setRealEstate(RealEstate realEstate) {
        this.realEstate = realEstate;
    }
}
