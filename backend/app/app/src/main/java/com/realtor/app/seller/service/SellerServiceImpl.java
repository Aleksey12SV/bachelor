package com.realtor.app.seller.service;

import com.realtor.app.seller.model.Seller;
import com.realtor.app.seller.repository.SellerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SellerServiceImpl implements SellerService {
    @Autowired
    private SellerRepo sellerRepo;

    @Override
    public List<Seller> getAllSellers() {
        return sellerRepo.findAll();
    }
}
