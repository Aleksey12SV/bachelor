package com.realtor.app.real_estate.service;

import com.realtor.app.building.model.Building;
import com.realtor.app.real_estate.model.RealEstate;
import com.realtor.app.real_estate.model.RealEstateFilters;
import com.realtor.app.real_estate.repository.RealEstateRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RealEstateServiceImpl implements RealEstateService {
    @Autowired
    private RealEstateRepo realEstateRepo;
    @Override
    public RealEstate saveRealEstate(RealEstate realEstate){
        return realEstateRepo.save(realEstate);
    }

    @Override
    public List<RealEstate> getAllProperties(){
        return realEstateRepo.findAll();
    }


    @Override
    public Page<RealEstate> getAllPaginatedRealEstates(Pageable pageable){
        return realEstateRepo.findAll(pageable);
    }

    @Override
    public Page<RealEstate> getAllFilteredRealEstatesPaginated(RealEstateFilters filters){
        List<RealEstate> filteredRealEstates = getAllProperties().stream()
//                .filter(estate -> filters.getLocation() == null || estate.getLocation().equalsIgnoreCase(criteria.getLocation()))
                .filter(estate -> filters.getPriceFrom() == null || estate.getPrice() >= filters.getPriceFrom())
                .filter(estate -> filters.getPriceTo() == null || estate.getPrice() <= filters.getPriceTo())
                .filter(estate -> filters.getMinSize() == null || estate.getSize() >= filters.getMinSize())
                .filter(estate -> filters.getMaxSize() == null || estate.getSize() <= filters.getMaxSize())
               .filter(estate -> filters.getMinFloor() == null || estate.getFloor() >= filters.getMinFloor())
               .filter(estate -> filters.getMaxFloor() == null || estate.getFloor() <= filters.getMaxFloor())
//                .filter(estate -> criteria.getPropertyTypes() == null || criteria.getPropertyTypes().isEmpty() || criteria.getPropertyTypes().contains(estate.getType().toLowerCase()))
//                .filter(estate -> criteria.getShowRealEstatesWithoutImages() == null || criteria.getShowRealEstatesWithoutImages() || estate.getHasImages())
                .collect(Collectors.toList());

        if (filters.getSorting() != null) {
            filteredRealEstates = sortRealEstates(filteredRealEstates, filters.getSorting());
        }

        int page = filters.getPage();
        int size = filters.getSize();
        int start = page * size;
        int end = Math.min(start + size, filteredRealEstates.size());

        List<RealEstate> paginatedList = filteredRealEstates.subList(start, end);
        return new PageImpl<>(paginatedList, PageRequest.of(page, size), filteredRealEstates.size());

    }

    private List<RealEstate> sortRealEstates(List<RealEstate> realEstates, String sorting) {
        switch (sorting) {
            case "PRICE_ASC":
                return realEstates.stream().sorted((a, b) -> Double.compare(a.getPrice(), b.getPrice())).collect(Collectors.toList());
            case "PRICE_DESC":
                return realEstates.stream().sorted((a, b) -> Double.compare(b.getPrice(), a.getPrice())).collect(Collectors.toList());
//            case "sizeAsc":
//                return realEstates.stream().sorted((a, b) -> Double.compare(a.getSize(), b.getSize())).collect(Collectors.toList());
//            case "sizeDesc":
//                return realEstates.stream().sorted((a, b) -> Double.compare(b.getSize(), a.getSize())).collect(Collectors.toList());
            default:
                return realEstates;
        }
    }
}
