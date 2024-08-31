package com.realtor.app.real_estate.service;

import com.realtor.app.real_estate.model.RealEstate;
import com.realtor.app.real_estate.model.RealEstateFilters;
import com.realtor.app.real_estate.model.RealEstateRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface RealEstateService {
    public RealEstate saveRealEstate(RealEstate realEstate);
    public Optional<RealEstate> getRealEstateById(int id);
    public List<RealEstate> getAllProperties();
    public List<RealEstate> getAllPropertiesWithImages();
    public List<RealEstate> getPropertiesBySeller (Integer sellerId);

    public Page<RealEstate> getAllPaginatedRealEstates(Pageable pageable);
    public Page<RealEstate> getAllFilteredRealEstatesPaginated(RealEstateFilters filters);
    public void deleteRealEstate(Integer realEstateId);
    public RealEstate createRealEstate(RealEstateRequest realEstateRequest);
    public RealEstate updateRealEstate(int id, RealEstate realEstate);
}
