package com.example.amCrudH2.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
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
    @OneToMany(targetEntity = Customer.class, cascade = CascadeType.ALL)
    @JoinColumn
    private List<Customer> customers;

}
