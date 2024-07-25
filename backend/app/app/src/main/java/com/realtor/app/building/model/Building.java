package com.realtor.app.building.model;

import com.realtor.app.district.model.District;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "buildings")
public class Building {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    @Column (name = "id")
    private int id;

    @ManyToOne
    @JoinColumn
    private District district;

    @Column (name = "name")
    private String name;

    @Column (name = "floors")
    private int floors;

    @Column (name = "year")
    private int year;

    @Column (name = "description")
    private String description;

    @Column (name = "construction")
    private String construction;

    public Building () {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getFloors() {
        return floors;
    }

    public void setFloors(int floors) {
        this.floors = floors;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getConstruction() {
        return construction;
    }

    public void setConstruction(String construction) {
        this.construction = construction;
    }
}
