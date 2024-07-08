package com.realtor.app.real_estate.service;

import com.realtor.app.building.model.Building;
import com.realtor.app.real_estate.model.RealEstate;
import com.realtor.app.real_estate.repository.RealEstateRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Service
public class RealEstateServiceImpl implements RealEstateService {
    @Autowired
    private RealEstateRepo realEstateRepo;
    @Override
    public RealEstate saveRealEstate(RealEstate realEstate){
        return realEstateRepo.save(realEstate);
    }

    @Override
    public List<RealEstate> getAllProperties(){
        return realEstateRepo.findAll();
    }


    @Override
    public Page<RealEstate> getAllPaginatedRealEstates(Pageable pageable){
        return realEstateRepo.findAll(pageable);
    }

}
