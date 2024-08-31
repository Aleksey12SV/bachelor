package com.realtor.app.real_estate.controller;

import com.realtor.app.real_estate.model.RealEstate;
import com.realtor.app.real_estate.model.RealEstateFilters;
import com.realtor.app.real_estate.model.RealEstateRequest;
import com.realtor.app.real_estate.service.RealEstateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/real-estate")
public class RealEstateController {
    @Autowired
    private RealEstateService realEstateService;

    @GetMapping(value = "/getAll/paginated")
    public Page<RealEstate> getAllPaginatedRealEstates(@RequestParam(defaultValue = "0") int page,
                                                   @RequestParam(defaultValue = "10") int size){
        return realEstateService.getAllPaginatedRealEstates(PageRequest.of(page,size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RealEstate> getRealEstateById(@PathVariable int id) {
        Optional<RealEstate> realEstate = realEstateService.getRealEstateById(id);

        if (realEstate.isPresent()) {
            return ResponseEntity.ok(realEstate.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/filtered")
    public Page<RealEstate> getFilteredRealEstates(@RequestBody RealEstateFilters filters){
        return realEstateService.getAllFilteredRealEstatesPaginated(filters);
    }

    @CrossOrigin(origins = "http://localhost:5173/")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRealEstate(@PathVariable Integer id) {
        realEstateService.deleteRealEstate(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<RealEstate> createRealEstate(@RequestBody RealEstateRequest realEstateRequest) {
        RealEstate createdRealEstate = realEstateService.createRealEstate(realEstateRequest);
        return ResponseEntity.ok(createdRealEstate);
    }

    @CrossOrigin(origins = "http://localhost:5173/")
    @PutMapping("/{id}")
    public ResponseEntity<RealEstate> updateRealEstate(@PathVariable int id, @RequestBody RealEstate realEstateDetails) {
        RealEstate updatedRealEstate = realEstateService.updateRealEstate(id, realEstateDetails);
        return ResponseEntity.ok(updatedRealEstate);
    }
}
