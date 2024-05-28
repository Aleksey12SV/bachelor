package com.realtor.app.real_estate.controller;

import com.realtor.app.real_estate.model.RealEstate;
import com.realtor.app.real_estate.service.RealEstateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/real-estate")
public class RealEstateController {
    @Autowired
    private RealEstateService realEstateService;
    @PostMapping("/add")
    public String add(@RequestBody RealEstate realEstate){
        realEstateService.saveRealEstate(realEstate);
        return "New real estate is saved";
    }

}
