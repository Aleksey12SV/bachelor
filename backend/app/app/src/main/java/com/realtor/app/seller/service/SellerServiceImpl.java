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

    public static SellerWithAssociatedProperties convertToExtendedSeller(Seller seller) {
        SellerWithAssociatedProperties extendedSeller = new SellerWithAssociatedProperties();
        extendedSeller.setId(seller.getId());
        extendedSeller.setFirstName(seller.getFirstName());
        extendedSeller.setLastName(seller.getLastName());
        extendedSeller.setPhoneNumber(seller.getPhoneNumber());

        return extendedSeller;
    }

}
