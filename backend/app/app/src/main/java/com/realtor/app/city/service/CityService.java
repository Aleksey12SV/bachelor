package com.realtor.app.city.service;

import com.realtor.app.city.model.City;

import java.util.List;

public interface CityService {
    public City saveCity(City city);
    public List<City> getAllCities();
}
