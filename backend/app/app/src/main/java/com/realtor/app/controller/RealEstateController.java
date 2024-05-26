package com.realtor.app.controller;

import com.realtor.app.model.PropertyType;
import com.realtor.app.model.RealEstate;
import com.realtor.app.service.PropertyTypeService;
import com.realtor.app.service.RealEstateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
