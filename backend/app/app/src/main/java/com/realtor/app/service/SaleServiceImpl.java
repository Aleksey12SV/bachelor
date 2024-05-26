package com.realtor.app.service;

import com.realtor.app.model.City;
import com.realtor.app.model.Sale;
import com.realtor.app.repo.CityRepo;
import com.realtor.app.repo.SaleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SaleServiceImpl implements SaleService {
    @Autowired
    private SaleRepo saleRepo;
    @Override
    public Sale saveSale(Sale sale){
        return saleRepo.save(sale);
    }

    @Override
    public List<Sale> getAllSales() {
        return saleRepo.findAll();
    }
}
