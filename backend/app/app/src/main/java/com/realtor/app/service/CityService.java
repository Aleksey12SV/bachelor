package com.realtor.app.service;

import com.realtor.app.model.City;

import java.util.List;

public interface CityService {
    public City saveCity(City city);
    public List<City> getAllCities();
}
