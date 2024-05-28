package com.realtor.app.property_type.repository;

import com.realtor.app.property_type.model.PropertyType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyTypeRepo extends JpaRepository<PropertyType, Integer> {
}
