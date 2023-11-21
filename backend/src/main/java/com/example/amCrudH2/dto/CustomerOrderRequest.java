package com.example.amCrudH2.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CustomerOrderRequest {
    private Long id;
    private Long telephone_id;
    private Long employee_id;
    private LocalDateTime orderDate;
    private Double totalPrice;


    public Long getId() {
        return id;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public Long getTelephone_id() {
        return telephone_id;
    }

    public Long getEmployee_id() {
        return employee_id;
    }
}
