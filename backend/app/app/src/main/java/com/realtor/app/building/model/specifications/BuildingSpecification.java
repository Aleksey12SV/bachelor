package com.realtor.app.building.model.specifications;

import com.realtor.app.building.model.Building;
import com.realtor.app.city.model.City;
import com.realtor.app.district.model.District;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

public class BuildingSpecification {
    public static Specification<Building> hasYearInRange(Integer startYear, Integer endYear) {
        return (building, cq, cb) -> cb.between(building.get("year"), startYear, endYear);
    }

    public static Specification<Building> getBuildingsInCity(Integer city_id){
        return (building, cq, cb) -> {
            Join<Building, District> districtJoin = building.join("district", JoinType.INNER);
            Join<District, City> cityJoin = districtJoin.join("city", JoinType.INNER);
            return cb.equal(cityJoin.get("id"), city_id);
        };
    }
}
