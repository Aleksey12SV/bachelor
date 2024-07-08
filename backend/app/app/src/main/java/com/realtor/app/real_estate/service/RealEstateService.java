package com.realtor.app.real_estate.service;

import com.realtor.app.building.model.Building;
import com.realtor.app.real_estate.model.RealEstate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RealEstateService {
    public RealEstate saveRealEstate(RealEstate realEstate);

    public List<RealEstate> getAllProperties();

    public Page<RealEstate> getAllPaginatedRealEstates(Pageable pageable);
}
