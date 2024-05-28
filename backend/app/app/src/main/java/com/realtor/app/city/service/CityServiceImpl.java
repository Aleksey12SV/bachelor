package com.realtor.app.city.service;

import com.realtor.app.city.model.City;
import com.realtor.app.city.repository.CityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityServiceImpl implements CityService {
    @Autowired
    private CityRepo cityRepo;
    @Override
    public City saveCity(City city){
        return cityRepo.save(city);
    }

    @Override
    public List<City> getAllCities() {
        return cityRepo.findAll();
    }
}
