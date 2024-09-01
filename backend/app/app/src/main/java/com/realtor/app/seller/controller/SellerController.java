package com.realtor.app.seller.controller;

import com.realtor.app.seller.model.Seller;
import com.realtor.app.seller.model.SellerWithAssociatedProperties;
import com.realtor.app.seller.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/seller")
public class SellerController {
    @Autowired
    private SellerService sellerService;

    @GetMapping("/getAll")
    public List<Seller> getAllSellers() {
        return sellerService.getAll();
    }

    @GetMapping("/getAllWithProperties")
    public List<SellerWithAssociatedProperties> getAllSellersWithProperties() {
        return sellerService.getAllWithProperties();
    }

    @CrossOrigin(origins = "http://localhost:5173/")
    @PostMapping
    public ResponseEntity<Seller> createSeller(@RequestBody Seller seller) {
        Seller newSeller = sellerService.createSeller(seller);
        return ResponseEntity.ok(newSeller);
    }

    @CrossOrigin(origins = "http://localhost:5173/")
    @PutMapping("/{id}")
    public ResponseEntity<Seller> updateSeller(@PathVariable int id, @RequestBody Seller sellerDetails) {
        Seller updatedSeller = sellerService.updateSeller(id, sellerDetails);
        return ResponseEntity.ok(updatedSeller);
    }

    @CrossOrigin(origins = "http://localhost:5173/")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeller(@PathVariable int id) {
        sellerService.deleteSeller(id);
        return ResponseEntity.noContent().build();
    }
}
