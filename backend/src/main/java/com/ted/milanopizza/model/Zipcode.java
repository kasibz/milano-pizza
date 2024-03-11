package com.ted.milanopizza.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "Zipcode")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString

public class Zipcode {

    // can't use zipcodeID as models have to be initialized with Id
    @Id
    @JsonProperty("zipcodeID")
    private Long zipcodeID;
    private String city;
    private String state;
    @OneToMany(mappedBy = "zipcode", cascade = {CascadeType.ALL})
    @JsonManagedReference
    private List<Customer> customers = new ArrayList<>();

    public Long getZipcodeID() {
        return zipcodeID;
    }

    public void setZipcodeID(Long zipcodeID) {
        this.zipcodeID = zipcodeID;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setState(String state) {
        this.state = state;
    }

    public void setCustomers(List<Customer> customers) {
        this.customers = customers;
    }

    public String getCity() {
        return city;
    }

    public String getState() {
        return state;
    }

    public List<Customer> getCustomers() {
        return customers;
    }

}

