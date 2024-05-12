package com.realtor.app.controller;

import com.realtor.app.model.City;
import com.realtor.app.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/city")
public class CityController {
    @Autowired
    private CityService cityService;
    @PostMapping("/add")
    public String add(@RequestBody City city){
        cityService.saveCity(city);
        return "New city is saved";
    }

    @GetMapping("/getAll")
    public List<City> getAllCities(){
        return cityService.getAllCities();
    }
}
