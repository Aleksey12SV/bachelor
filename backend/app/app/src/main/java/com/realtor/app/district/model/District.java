package com.realtor.app.district.model;

import com.realtor.app.city.model.City;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "districts")
public class District {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    @Column (name = "id")
    private int id;

    @Column (name = "name")
    private String name;

    @ManyToOne
    @JoinColumn
    private City city;

    public District() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }
}
