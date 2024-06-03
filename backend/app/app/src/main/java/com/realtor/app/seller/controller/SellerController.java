package com.realtor.app.seller.controller;

import com.realtor.app.seller.model.Seller;
import com.realtor.app.seller.model.SellerSalesDTO;
import com.realtor.app.seller.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import java.util.List;


@RestController
@RequestMapping("/seller")
public class SellerController {
    @Autowired
    private SellerService sellerService;

    @GetMapping("/getAll")
    public List<SellerSalesDTO> getAllSellers() {
        return sellerService.getAll();
    }
}
