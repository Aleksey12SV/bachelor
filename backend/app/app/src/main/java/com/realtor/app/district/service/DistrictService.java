package com.realtor.app.district.service;

import com.realtor.app.district.model.District;

import java.util.List;

public interface DistrictService {
    public List<District> getAllDistricts();
    public List<District> getDistrictsByCityId(Integer city_id);
}
