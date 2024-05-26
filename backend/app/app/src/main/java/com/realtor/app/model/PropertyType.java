package com.realtor.app.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "property_type")
public class PropertyType {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    @Column (name = "id")
    private int id;

    @Column (name = "name")
    private String name;

    @Column (name = "description")
    private String description;

    public PropertyType() {
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
