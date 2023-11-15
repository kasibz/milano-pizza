package com.example.amCrudH2.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Employee")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private Boolean status;

    // will have a oneToMany with CustomerOrder Entity
    // employee can have multiple orders
    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}

