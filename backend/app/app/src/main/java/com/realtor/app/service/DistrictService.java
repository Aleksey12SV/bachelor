package com.realtor.app.service;

import com.realtor.app.model.District;

import java.util.List;

public interface DistrictService {
    public List<District> getAllDistricts();
    public List<District> getDistrictsByCityId(Integer city_id);
}
