package com.realtor.app.real_estate.controller;

import com.realtor.app.building.model.Building;
import com.realtor.app.real_estate.model.RealEstate;
import com.realtor.app.real_estate.model.RealEstateFilters;
import com.realtor.app.real_estate.service.RealEstateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
    @GetMapping(value = "/getAll/paginated")
    public Page<RealEstate> getAllPaginatedRealEstates(@RequestParam(defaultValue = "0") int page,
                                                   @RequestParam(defaultValue = "10") int size){
        return realEstateService.getAllPaginatedRealEstates(PageRequest.of(page,size));
    }

    @PostMapping("/filtered")
    public Page<RealEstate> getFilteredRealEstates(@RequestBody RealEstateFilters filters){
        return realEstateService.getAllFilteredRealEstatesPaginated(filters);
    }
}
