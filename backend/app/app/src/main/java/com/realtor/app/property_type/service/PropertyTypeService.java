package com.realtor.app.property_type.service;

import com.realtor.app.property_type.model.PropertyType;

import java.util.List;

public interface PropertyTypeService {
    public PropertyType savePropertyType(PropertyType city);
    public List<PropertyType> getAllPropertyTypes();
}
