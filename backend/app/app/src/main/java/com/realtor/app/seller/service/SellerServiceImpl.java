package com.realtor.app.seller.service;

import com.realtor.app.seller.model.Seller;
import com.realtor.app.seller.model.SellerSalesDTO;
import com.realtor.app.seller.repository.SellerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SellerServiceImpl implements SellerService {
    @Autowired
    private SellerRepo sellerRepo;

    @Override
    public List<SellerSalesDTO> getAll() {
        List<Object[]> results = sellerRepo.getAll();
        return results.stream().map(this::mapToSellerSalesDTO).collect(Collectors.toList());
    }

    private SellerSalesDTO mapToSellerSalesDTO(Object[] result) {
        Long sellerId = ((Number) result[0]).longValue();
        String firstName = (String) result[1];
        String lastName = (String) result [2];
        String phoneNumber = (String) result [3];
        List<String> saleIds = Arrays.stream((result[4].toString().split(","))).toList();
        return new SellerSalesDTO(sellerId, firstName, lastName, phoneNumber, saleIds);
    }
}
