package com.realtor.app.service;

import com.realtor.app.model.RealEstate;

import java.util.List;

public interface RealEstateService {
    public RealEstate saveRealEstate(RealEstate realEstate);
    public List<RealEstate> getAllProperties();
}
