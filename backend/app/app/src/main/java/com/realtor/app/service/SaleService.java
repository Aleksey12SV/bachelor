package com.realtor.app.service;

import com.realtor.app.model.Sale;

import java.util.List;

public interface SaleService {
    public Sale saveSale(Sale sale);
    public List<Sale> getAllSales();
}
