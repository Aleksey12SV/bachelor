package com.realtor.app.real_estate.service;

import com.realtor.app.real_estate.model.RealEstate;
import com.realtor.app.real_estate.model.RealEstateFilters;
import com.realtor.app.real_estate.model.RealEstateRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RealEstateService {
    public RealEstate saveRealEstate(RealEstate realEstate);

    public List<RealEstate> getAllProperties();
    public List<RealEstate> getAllPropertiesWithImages();

    public Page<RealEstate> getAllPaginatedRealEstates(Pageable pageable);
    public Page<RealEstate> getAllFilteredRealEstatesPaginated(RealEstateFilters filters);
    public void deleteRealEstate(Integer realEstateId);
    public RealEstate createRealEstate(RealEstateRequest realEstateRequest);
    public RealEstate updateRealEstate(int id, RealEstate realEstate);
}
