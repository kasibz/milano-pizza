package com.example.amCrudH2.dto;

import java.time.LocalDateTime;

public class OrderDetailRequest {
    private Long id;
    private Long customerOrder_id;
    private Long product_id;
    private LocalDateTime orderDate;
    private Long quantity;
    private Double discount;
    private Double subTotal;

    public Long getId() {
        return id;
    }

    public Long getCustomerOrder_id() {
        return customerOrder_id;
    }

    public Long getProduct_id() {
        return product_id;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public Long getQuantity() {
        return quantity;
    }

    public Double getDiscount() {
        return discount;
    }

    public Double getSubTotal() {
        return subTotal;
    }
}
