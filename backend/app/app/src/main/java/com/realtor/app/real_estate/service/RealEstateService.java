package com.realtor.app.real_estate.service;

import com.realtor.app.real_estate.model.RealEstate;

import java.util.List;

public interface RealEstateService {
    public RealEstate saveRealEstate(RealEstate realEstate);
    public List<RealEstate> getAllProperties();
}
