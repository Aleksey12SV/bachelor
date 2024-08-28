package com.realtor.app.building.controller;

import com.realtor.app.building.model.Building;
import com.realtor.app.building.service.BuildingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

class BuildingRequest{
    private Integer startYear;
    private Integer endYear;
    private int city_id;
    private int page;
    private int size;

    public Integer getStartYear() {
        return startYear;
    }

    public void setStartYear(int startYear) {
        this.startYear = startYear;
    }

    public Integer getEndYear() {
        return endYear;
    }

    public void setEndYear(int endYear) {
        this.endYear = endYear;
    }

    public int getCity_id() {
        return city_id;
    }

    public void setCity_id(int city_id) {
        this.city_id = city_id;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }
}

@RestController
@RequestMapping("/building")
public class BuildingController {
    @Autowired
    private BuildingService buildingService;
    @PostMapping("/add")
    public ResponseEntity<Building> add(@RequestBody Building building){
        Building newBuilding = buildingService.saveBuilding(building);
        return ResponseEntity.ok(newBuilding);
    }
    @CrossOrigin(origins = "http://localhost:5173/")
    @PutMapping("/{id}")
    public ResponseEntity<Building> updateBuilding(@PathVariable int id, @RequestBody Building building) {
        Building updatedBuilding = buildingService.updateBuilding(id, building);
        return ResponseEntity.ok(updatedBuilding);
    }
    @GetMapping(value = "/getAll")
    public List<Building> getAllBuildings(@RequestParam(defaultValue = "0") int page,
                                          @RequestParam(defaultValue = "10") int size){
        return buildingService.getAllBuildings();
    }

    @GetMapping(value = "/getAll/paginated")
    public Page<Building> getAllBuildingsPaginated( @RequestParam(defaultValue = "0") int page,
                                           @RequestParam(defaultValue = "10") int size){
        return buildingService.getAllBuildingsPaginated(PageRequest.of(page,size));
    }

    @PostMapping("/getFiltered")
    public Page<Building> getFilteredBuildings(@RequestBody BuildingRequest buildingRequest){
        if (buildingRequest.getStartYear() == null) {
            buildingRequest.setStartYear(0);
        }
        if (buildingRequest.getEndYear() == null) {
            buildingRequest.setEndYear(99999);
        }
        return buildingService.getAllFilteredBuildings(buildingRequest.getCity_id(),PageRequest.of(buildingRequest.getPage(),buildingRequest.getSize()));
//        return buildingService.getAllFilteredBuildings(buildingRequest.getStartYear(), buildingRequest.getEndYear(), buildingRequest.getCity_id(), PageRequest.of(buildingRequest.getPage(),buildingRequest.getSize()));
    }

    @CrossOrigin(origins = "http://localhost:5173/")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBuilding(@PathVariable Integer id) {
        buildingService.deleteBuilding(id);
        return ResponseEntity.noContent().build();
    }
}
