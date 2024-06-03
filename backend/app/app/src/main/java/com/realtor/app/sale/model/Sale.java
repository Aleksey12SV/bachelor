package com.realtor.app.sale.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.realtor.app.seller.model.Seller;
import com.realtor.app.real_estate.model.RealEstate;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import java.time.LocalDate;
import java.util.Set;

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


    @ManyToMany
    @JoinTable(name = "sellers_sales", joinColumns = @JoinColumn(name = "sales_id"),
            inverseJoinColumns = @JoinColumn(name = "seller_id"))
    private Set<Seller> sellers;

    public Sale() {
    }

    public Set<Seller> getSellers() {
        return sellers;
    }

    public void setSellers(Set<Seller> sellers) {
        this.sellers = sellers;
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
