package com.realtor.app.controller;

import com.realtor.app.model.District;
import com.realtor.app.model.RealEstate;
import com.realtor.app.model.Sale;
import com.realtor.app.model.Status;
import com.realtor.app.service.DistrictService;
import com.realtor.app.service.RealEstateService;
import com.realtor.app.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

class SaleRequest {
    private LocalDate saleDate;
    private Status status;
    private Float salePrice;
    private int realEstateId;

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

    public int getRealEstateId() {
        return realEstateId;
    }

    public void setRealEstateId(int realEstateId) {
        this.realEstateId = realEstateId;
    }
}

@RestController
@RequestMapping("/sale")
public class SaleController {
    @Autowired
    private SaleService saleService;

    @Autowired
    private RealEstateService realEstateService;

    @GetMapping("/getAll")
    public List<Sale> getAllSales(){
        return saleService.getAllSales();
    }

    @PostMapping("/add")
    public String add(@RequestBody SaleRequest sale){
        RealEstate property = realEstateService.getAllProperties().stream().filter(p -> p.getId() == sale.getRealEstateId()).findFirst().orElseThrow();
        Sale saleToSave = new Sale(sale.getSaleDate(), sale.getStatus(), sale.getSalePrice(), property);
        saleService.saveSale(saleToSave);
        return "New sale is saved";
    }
}
