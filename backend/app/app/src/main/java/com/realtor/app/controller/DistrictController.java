package com.realtor.app.controller;

import com.realtor.app.model.District;
import com.realtor.app.service.DistrictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/district")
public class DistrictController {
    @Autowired
    private DistrictService districtService;

    @GetMapping("/getAll")
    public List<District> getAllDistricts(){
        return districtService.getAllDistricts();
    }

    @GetMapping("/{city_id}/district")
    public List<District> getDistrictsInCity(@PathVariable Integer city_id){
        List<District> test = districtService.getDistrictsByCityId(city_id);
        return districtService.getDistrictsByCityId(city_id);
    }
}
