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

import java.util.Date;
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
        List<RealEstate> filteredRealEstates = applyFilters(filters);

        if (filters.getSorting() != null) {
            filteredRealEstates = sortRealEstates(filteredRealEstates, filters.getSorting());
        }

        return paginateRealEstates(filteredRealEstates, filters.getPage(), filters.getSize());
    }

    @Transactional
    @Override
    public RealEstate createRealEstate(RealEstateRequest realEstateRequest) {
        RealEstate newRealEstate = new RealEstate();
        newRealEstate.setPublishDate(new Date());
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

    @Override
    public RealEstate updateRealEstate(int id, RealEstate realEstateDetails) {
        RealEstate existingRealEstate = realEstateRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Real estate not found with id " + id));

        updateRealEstate(existingRealEstate, realEstateDetails);
        return realEstateRepo.save(existingRealEstate);
    }

    // Helper Methods
    private List<RealEstate> applyFilters(RealEstateFilters filters) {
        return (filters.getShowRealEstatesWithoutImages() == null || filters.getShowRealEstatesWithoutImages() == true ? getAllProperties() : getAllPropertiesWithImages()).stream()
                .filter(estate -> filters.getBuildingId() == null || estate.getBuilding().getId() == filters.getBuildingId())
                .filter(estate -> filters.getLocation() == null || estate.getBuilding().getDistrict().getCity().getName().equalsIgnoreCase(filters.getLocation()))
                .filter(estate -> filters.getDistricts() == null || filters.getDistricts().contains(estate.getBuilding().getDistrict().getName()))
                .filter(estate -> filters.getHeating() == null || estate.getHeating().equalsIgnoreCase(filters.getHeating()))
                .filter(estate -> filters.getStatus() == null || estate.getStatus().equalsIgnoreCase(filters.getStatus()))
                .filter(estate -> filters.getConstruction() == null || estate.getBuilding().getConstruction().equalsIgnoreCase(filters.getConstruction()))
                .filter(estate -> filters.getPriceFrom() == null || estate.getPrice() >= filters.getPriceFrom())
                .filter(estate -> filters.getPriceTo() == null || estate.getPrice() <= filters.getPriceTo())
                .filter(estate -> filters.getPriceFromSqM() == null || estate.getPrice() / estate.getSize() >= filters.getPriceFromSqM())
                .filter(estate -> filters.getPriceToSqM() == null || estate.getPrice() / estate.getSize() <= filters.getPriceToSqM())
                .filter(estate -> filters.getMinYear() == null || estate.getBuilding().getYear() >= filters.getMinYear())
                .filter(estate -> filters.getMaxYear() == null || estate.getBuilding().getYear() <= filters.getMaxYear())
                .filter(estate -> filters.getMinSize() == null || estate.getSize() >= filters.getMinSize())
                .filter(estate -> filters.getMaxSize() == null || estate.getSize() <= filters.getMaxSize())
                .filter(estate -> filters.getMinFloor() == null || estate.getFloor() >= filters.getMinFloor())
                .filter(estate -> filters.getMaxFloor() == null || estate.getFloor() <= filters.getMaxFloor())
                .filter(estate -> filters.getPropertyTypes() == null || filters.getPropertyTypes().contains(estate.getPropertyType().getName()))
                .filter(estate -> filters.getSeller() == null || estate.getSellers().stream().anyMatch(seller -> seller.getId() == Integer.parseInt(filters.getSeller())))
                .collect(Collectors.toList());
    }

    private List<RealEstate> sortRealEstates(List<RealEstate> realEstates, String sorting) {
        switch (sorting) {
            case "priceAsc":
                return realEstates.stream().sorted((a, b) -> Double.compare(a.getPrice(), b.getPrice())).collect(Collectors.toList());
            case "priceDesc":
                return realEstates.stream().sorted((a, b) -> Double.compare(b.getPrice(), a.getPrice())).collect(Collectors.toList());
            case "newest":
                return realEstates.stream().sorted((a, b) -> b.getPublishDate().compareTo(a.getPublishDate())).collect(Collectors.toList());
            case "oldest":
                return realEstates.stream().sorted((a, b) -> a.getPublishDate().compareTo(b.getPublishDate())).collect(Collectors.toList());
            default:
                return realEstates;
        }
    }

    private Page<RealEstate> paginateRealEstates(List<RealEstate> realEstates, int page, int size) {
        int start = page * size;
        int end = Math.min(start + size, realEstates.size());
        List<RealEstate> paginatedList = realEstates.subList(start, end);
        return new PageImpl<>(paginatedList, PageRequest.of(page, size), realEstates.size());
    }

    private void updateRealEstateFromRequest(RealEstate realEstate, RealEstateRequest request) {
        realEstate.setBuilding(request.getBuilding());
        realEstate.setPropertyType(request.getPropertyType());
        realEstate.setPrice(request.getPrice());
        realEstate.setSize(request.getSize());
        realEstate.setFloor(request.getFloor());
        realEstate.setHeating(request.getHeating());
        realEstate.setDescriptionBG(request.getDescriptionBG());
        realEstate.setDescriptionEN(request.getDescriptionEN());
        realEstate.setTopProperty(request.isTopProperty());
        realEstate.setStatus(request.getStatus());
        realEstate.setTitleBG(request.getTitleBG());
        realEstate.setTitleEN(request.getTitleEN());
        realEstate.setRooms(request.getRooms());
        Set<Seller> mergedSellers = request.getSellers().stream()
                .map(entityManager::merge)
                .collect(Collectors.toSet());
        realEstate.setSellers(mergedSellers);
    }

    private void updateRealEstate(RealEstate existingRealEstate, RealEstate newDetails) {
        existingRealEstate.setBuilding(newDetails.getBuilding());
        existingRealEstate.setPropertyType(newDetails.getPropertyType());
        existingRealEstate.setPrice(newDetails.getPrice());
        existingRealEstate.setSize(newDetails.getSize());
        existingRealEstate.setFloor(newDetails.getFloor());
        existingRealEstate.setHeating(newDetails.getHeating());
        existingRealEstate.setDescriptionBG(newDetails.getDescriptionBG());
        existingRealEstate.setDescriptionEN(newDetails.getDescriptionEN());
        existingRealEstate.setTopProperty(newDetails.isTopProperty());
        existingRealEstate.setPublishDate(newDetails.getPublishDate());
        existingRealEstate.setStatus(newDetails.getStatus());
        existingRealEstate.setSellers(newDetails.getSellers());
        existingRealEstate.setTitleBG(newDetails.getTitleBG());
        existingRealEstate.setTitleEN(newDetails.getTitleEN());
        existingRealEstate.setRooms(newDetails.getRooms());
    }
}
