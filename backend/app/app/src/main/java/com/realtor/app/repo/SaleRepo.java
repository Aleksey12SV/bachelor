package com.realtor.app.repo;

import com.realtor.app.model.RealEstate;
import com.realtor.app.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaleRepo extends JpaRepository<Sale, Integer> {
}
