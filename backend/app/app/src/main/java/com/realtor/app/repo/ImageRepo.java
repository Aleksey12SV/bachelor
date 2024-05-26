package com.realtor.app.repo;

import com.realtor.app.model.City;
import com.realtor.app.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepo extends JpaRepository<Image, Integer> {
}
