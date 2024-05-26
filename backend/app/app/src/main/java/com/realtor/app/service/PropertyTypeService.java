package com.realtor.app.service;

import com.realtor.app.model.PropertyType;

import java.util.List;

public interface PropertyTypeService {
    public PropertyType savePropertyType(PropertyType city);
    public List<PropertyType> getAllPropertyTypes();
}
