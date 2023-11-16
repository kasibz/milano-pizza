package com.example.amCrudH2.dto;

import java.time.LocalDate;

public class OrderDetailRequest {
    private Long id;
    private Long customerOrder_id;
    private Long product_id;
    private LocalDate orderDate;
    private Long quantity;
    private Double priceCharged;

    public Long getId() {
        return id;
    }

    public Long getCustomerOrder_id() {
        return customerOrder_id;
    }

    public Long getProduct_id() {
        return product_id;
    }

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public Long getQuantity() {
        return quantity;
    }

    public Double getPriceCharged() {
        return priceCharged;
    }
}
