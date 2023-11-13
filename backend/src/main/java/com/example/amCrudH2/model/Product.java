package com.example.amCrudH2.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Product")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class Product 
{
    @Id
    @JsonProperty("productID")
    private Long productID;
    private String description;
    private double itemPrice;
    private double discount;
    
}
