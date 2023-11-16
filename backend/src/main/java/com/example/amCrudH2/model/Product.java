package com.example.amCrudH2.model;

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private Double price;


    public Long getProductID()
    {
        return id;
    }
    
    public String getName()
    {
        return name;
    }

    public Double getPrice()
    {
        return price;
    }

    public void setPrice(double price)
    {
        this.price = price;
    }
    
}
