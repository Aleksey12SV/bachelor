package com.realtor.app.service;

import com.realtor.app.model.City;
import com.realtor.app.model.PropertyType;
import com.realtor.app.repo.CityRepo;
import com.realtor.app.repo.PropertyTypeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropertyTypeServiceImpl implements PropertyTypeService {
    @Autowired
    private PropertyTypeRepo propertyTypeRepo;
    @Override
    public PropertyType savePropertyType(PropertyType propertyType){
        return propertyTypeRepo.save(propertyType);
    }

    @Override
    public List<PropertyType> getAllPropertyTypes() {
        return propertyTypeRepo.findAll();
    }
}
