package com.realtor.app.property_type.controller;

import com.realtor.app.property_type.model.PropertyType;
import com.realtor.app.property_type.service.PropertyTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/property-type")
public class PropertyTypeController {
    @Autowired
    private PropertyTypeService propertyTypeService;
    @PostMapping("/add")
    public String add(@RequestBody PropertyType propertyType){
        propertyTypeService.savePropertyType(propertyType);
        return "New property type is saved";
    }

    @GetMapping("/getAll")
    public List<PropertyType> getAllPropertyTypes(){
        return propertyTypeService.getAllPropertyTypes();
    }
}
