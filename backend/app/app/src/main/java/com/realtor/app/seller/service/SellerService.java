package com.realtor.app.seller.service;

import com.realtor.app.seller.model.Seller;
import com.realtor.app.seller.model.SellerWithAssociatedProperties;

import java.util.List;

public interface SellerService {
    public List<Seller> getAll();
    public List<SellerWithAssociatedProperties> getAllWithProperties();
    Seller createSeller(Seller seller);
    Seller updateSeller(int id, Seller sellerDetails);
    void deleteSeller(int id);
}
