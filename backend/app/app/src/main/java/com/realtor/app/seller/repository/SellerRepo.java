package com.realtor.app.seller.repository;

import com.realtor.app.seller.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SellerRepo extends JpaRepository<Seller, Integer> {
//    @Query(value = "SELECT s.id AS sellerId, \n" +
//            "       s.first_name AS firstName, \n" +
//            "       s.last_name AS lastName, \n" +
//            "       s.phone_number AS phoneNumber, \n" +
//            "       GROUP_CONCAT(ssj.sales_id) AS saleIds \n" +
//            "FROM sellers s \n" +
//            "LEFT JOIN sellers_sales ssj ON s.id = ssj.seller_id \n" +
//            "LEFT JOIN sales sa ON ssj.sales_id = sa.id \n" +
//            "GROUP BY s.id, s.first_name, s.last_name, s.phone_number;", nativeQuery = true)
//    List<Object[]> getAll();
}
