package com.realtor.app.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "cities")
public class City {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    @Column (name = "id")
    private int id;

    @Column (name = "name")
    private String name;

    public City() {
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
}
