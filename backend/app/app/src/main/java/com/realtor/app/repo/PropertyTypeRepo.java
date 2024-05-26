package com.realtor.app.repo;

import com.realtor.app.model.PropertyType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyTypeRepo extends JpaRepository<PropertyType, Integer> {
}
