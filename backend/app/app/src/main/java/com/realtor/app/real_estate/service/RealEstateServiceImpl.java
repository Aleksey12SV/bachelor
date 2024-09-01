package com.realtor.app.real_estate.service;

import com.realtor.app.image.repository.ImageRepo;
import com.realtor.app.real_estate.model.RealEstate;
import com.realtor.app.real_estate.model.RealEstateFilters;
import com.realtor.app.real_estate.model.RealEstateRequest;
import com.realtor.app.real_estate.repository.RealEstateRepo;
import com.realtor.app.seller.model.Seller;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RealEstateServiceImpl implements RealEstateService {

    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private RealEstateRepo realEstateRepo;

    @Autowired
    private ImageRepo imageRepo;

    @Override
    public RealEstate saveRealEstate(RealEstate realEstate) {
        return realEstateRepo.save(realEstate);
    }

    @Override
    public List<RealEstate> getAllProperties() {
        return realEstateRepo.findAll();
    }


    @Override
    public List<RealEstate> getAllPropertiesWithImages() {
        return realEstateRepo.findAllWithImages();
    }

    @Override
    public List<RealEstate> getPropertiesBySeller(Integer sellerId) {
        return realEstateRepo.findBySellerId(sellerId);
    }


    @Override
    public Page<RealEstate> getAllPaginatedRealEstates(Pageable pageable) {
        return realEstateRepo.findAll(pageable);
    }

    @Override
    public Page<RealEstate> getAllFilteredRealEstatesPaginated(RealEstateFilters filters) {
        List<RealEstate> filteredRealEstates = new ArrayList<>();
        if (filters.getBuildingId() != null) {
            filteredRealEstates = realEstateRepo.findByBuildingId(filters.getBuildingId());
        } else {
            filteredRealEstates = (filters.getShowRealEstatesWithoutImages() == null || filters.getShowRealEstatesWithoutImages() == true ? getAllProperties() : getAllPropertiesWithImages()).stream().filter(estate -> filters.getLocation() == null || estate.getBuilding().getDistrict().getCity().getName().equalsIgnoreCase(filters.getLocation())).filter(estate -> filters.getHeating() == null || estate.getHeating().equalsIgnoreCase(filters.getHeating())).filter(estate -> filters.getStatus() == null || estate.getStatus().equalsIgnoreCase(filters.getStatus())).filter(estate -> filters.getConstruction() == null || estate.getBuilding().getConstruction().equalsIgnoreCase(filters.getConstruction())).filter(estate -> filters.getPriceFrom() == null || estate.getPrice() >= filters.getPriceFrom()).filter(estate -> filters.getPriceTo() == null || estate.getPrice() <= filters.getPriceTo()).filter(estate -> filters.getPriceFromSqM() == null || estate.getPrice() / estate.getSize() >= filters.getPriceFromSqM()).filter(estate -> filters.getPriceToSqM() == null || estate.getPrice() / estate.getSize() <= filters.getPriceTo()).filter(estate -> filters.getMinYear() == null || estate.getBuilding().getYear() >= filters.getMinYear()).filter(estate -> filters.getMaxYear() == null || estate.getBuilding().getYear() <= filters.getMaxYear()).filter(estate -> filters.getMinSize() == null || estate.getSize() >= filters.getMinSize()).filter(estate -> filters.getMaxSize() == null || estate.getSize() <= filters.getMaxSize()).filter(estate -> filters.getMinFloor() == null || estate.getFloor() >= filters.getMinFloor()).filter(estate -> filters.getMaxFloor() == null || estate.getFloor() <= filters.getMaxFloor()).filter(estate -> filters.getPropertyTypes() == null || filters.getPropertyTypes().contains(estate.getPropertyType().getName())).filter(estate -> filters.getSeller() == null || estate.getSellers().stream().anyMatch(seller -> filters.getSeller().equals(String.valueOf(seller.getId())))).collect(Collectors.toList());
        }

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

    @Override
    @Transactional
    public RealEstate createRealEstate(RealEstateRequest realEstateRequest) {
        RealEstate newRealEstate = new RealEstate();
        updateRealEstateFromRequest(newRealEstate, realEstateRequest);
        return realEstateRepo.save(newRealEstate);
    }

    @Transactional
    @Override
    public void deleteRealEstate(Integer realEstateId) {
        RealEstate realEstate = realEstateRepo.findById(realEstateId)
                .orElseThrow(() -> new EntityNotFoundException("Real estate not found"));
        realEstate.getSellers().clear();
        realEstateRepo.save(realEstate);

        imageRepo.deleteByRealEstateId(realEstateId);
        realEstateRepo.deleteById(realEstateId);
    }

    @Override
    public Optional<RealEstate> getRealEstateById(int id) {
        return realEstateRepo.findById(id);
    }

    private List<RealEstate> sortRealEstates(List<RealEstate> realEstates, String sorting) {
        switch (sorting) {
            case "PRICE_ASC":
                return realEstates.stream().sorted((a, b) -> Double.compare(a.getPrice(), b.getPrice())).collect(Collectors.toList());
            case "PRICE_DESC":
                return realEstates.stream().sorted((a, b) -> Double.compare(b.getPrice(), a.getPrice())).collect(Collectors.toList());
            case "NEWEST":
                return realEstates.stream().sorted((a, b) -> b.getPublishDate().compareTo(a.getPublishDate())).collect(Collectors.toList());
            case "OLDEST":
                return realEstates.stream().sorted((a, b) -> a.getPublishDate().compareTo(b.getPublishDate())).collect(Collectors.toList());
            default:
                return realEstates;
        }
    }

    private void updateRealEstateFromRequest(RealEstate realEstate, RealEstateRequest realEstateDTO) {
        realEstate.setBuilding(realEstateDTO.getBuilding());
        realEstate.setPropertyType(realEstateDTO.getPropertyType());
        realEstate.setPrice(realEstateDTO.getPrice());
        realEstate.setSize(realEstateDTO.getSize());
        realEstate.setFloor(realEstateDTO.getFloor());
        realEstate.setHeating(realEstateDTO.getHeating());
        realEstate.setDescriptionBG(realEstateDTO.getDescriptionBG());
        realEstate.setDescriptionEN(realEstateDTO.getDescriptionEN());
        realEstate.setTopProperty(realEstateDTO.isTopProperty());
        realEstate.setStatus(realEstateDTO.getStatus());
        Set<Seller> mergedSellers = realEstateDTO.getSellers().stream().map(seller -> entityManager.merge(seller)).collect(Collectors.toSet());

        realEstate.setSellers(mergedSellers);
    }

    @Override
    public RealEstate updateRealEstate(int id, RealEstate realEstateDetails) {
        Optional<RealEstate> optionalRealEstate = realEstateRepo.findById(id);

        if (optionalRealEstate.isPresent()) {
            RealEstate existingRealEstate = optionalRealEstate.get();
            existingRealEstate.setBuilding(realEstateDetails.getBuilding());
            existingRealEstate.setPropertyType(realEstateDetails.getPropertyType());
            existingRealEstate.setPrice(realEstateDetails.getPrice());
            existingRealEstate.setSize(realEstateDetails.getSize());
            existingRealEstate.setFloor(realEstateDetails.getFloor());
            existingRealEstate.setHeating(realEstateDetails.getHeating());
            existingRealEstate.setDescriptionBG(realEstateDetails.getDescriptionBG());
            existingRealEstate.setDescriptionEN(realEstateDetails.getDescriptionEN());
            existingRealEstate.setTopProperty(realEstateDetails.isTopProperty());
            existingRealEstate.setPublishDate(realEstateDetails.getPublishDate());
            existingRealEstate.setStatus(realEstateDetails.getStatus());
            existingRealEstate.setSellers(realEstateDetails.getSellers());

            return realEstateRepo.save(existingRealEstate);
        } else {
            throw new RuntimeException("Real estate not found with id " + id);
        }
    }
}
