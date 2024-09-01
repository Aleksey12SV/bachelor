package com.realtor.app.seller.service;

import com.realtor.app.real_estate.model.RealEstate;
import com.realtor.app.real_estate.repository.RealEstateRepo;
import com.realtor.app.seller.model.Seller;
import com.realtor.app.seller.model.SellerWithAssociatedProperties;
import com.realtor.app.seller.repository.SellerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SellerServiceImpl implements SellerService {
    @Autowired
    private SellerRepo sellerRepo;

    @Autowired
    private RealEstateRepo realEstateRepo;

    @Override
    public List<Seller> getAll() {
        List<Seller> results = sellerRepo.findAll();
        return results;
    }

    @Override
    public List<SellerWithAssociatedProperties> getAllWithProperties() {
        List<Seller> sellers = sellerRepo.findAll();
        List<SellerWithAssociatedProperties> extendedSellers= sellers.stream()
                .map(SellerServiceImpl::convertToExtendedSeller)
                .collect(Collectors.toList());
        extendedSellers.forEach(seller -> {
            List<RealEstate> realEstates = realEstateRepo.findBySellerId(seller.getId());
            seller.setRealEstates(realEstates);
        });
        return extendedSellers;
    }

    @Override
    public Seller createSeller(Seller seller) {
        return sellerRepo.save(seller);
    }

    @Override
    public Seller updateSeller(int id, Seller sellerDetails) {
        Seller existingSeller = sellerRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Seller not found with id: " + id));

        existingSeller.setFirstName(sellerDetails.getFirstName());
        existingSeller.setLastName(sellerDetails.getLastName());
        existingSeller.setPhoneNumber(sellerDetails.getPhoneNumber());

        return sellerRepo.save(existingSeller);
    }

    @Override
    public void deleteSeller(int id) {
        Seller existingSeller = sellerRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Seller not found with id: " + id));

        sellerRepo.delete(existingSeller);
    }

    public static SellerWithAssociatedProperties convertToExtendedSeller(Seller seller) {
        SellerWithAssociatedProperties extendedSeller = new SellerWithAssociatedProperties();
        extendedSeller.setId(seller.getId());
        extendedSeller.setFirstName(seller.getFirstName());
        extendedSeller.setLastName(seller.getLastName());
        extendedSeller.setPhoneNumber(seller.getPhoneNumber());

        return extendedSeller;
    }

}
