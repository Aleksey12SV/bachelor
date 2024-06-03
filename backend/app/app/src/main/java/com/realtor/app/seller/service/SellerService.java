package com.realtor.app.seller.service;

import com.realtor.app.seller.model.Seller;
import com.realtor.app.seller.model.SellerSalesDTO;

import java.util.List;

public interface SellerService {
    public List<SellerSalesDTO> getAll();
}
