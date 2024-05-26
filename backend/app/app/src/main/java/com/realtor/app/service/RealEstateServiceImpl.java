package com.realtor.app.service;

import com.realtor.app.model.City;
import com.realtor.app.model.RealEstate;
import com.realtor.app.repo.CityRepo;
import com.realtor.app.repo.RealEstateRepo;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/getAll")
    public List<RealEstate> getAllProperties(){
        return realEstateRepo.findAll();
    }

}
