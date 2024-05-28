package com.realtor.app.district.service;

import com.realtor.app.district.model.District;
import com.realtor.app.district.repository.DistrictRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DistrictServiceImpl implements  DistrictService{
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private DistrictRepo districtRepo;

    @Override
    public List<District> getAllDistricts() {
        return districtRepo.findAll();
    }

    public List<District> getDistrictsByCityId(Integer city_id) {
        return districtRepo.getDistrictsByCityId((city_id));
    }
}
