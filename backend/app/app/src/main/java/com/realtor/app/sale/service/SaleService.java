package com.realtor.app.sale.service;

import com.realtor.app.sale.model.Sale;

import java.util.List;

public interface SaleService {
    public Sale saveSale(Sale sale);
    public List<Sale> getAllSales();
}
