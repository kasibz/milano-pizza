package com.example.amCrudH2.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

//POST
//customerOrder/{customerOrderId}/OrderDetail
//
////GET
//customerOrder/{customerOrderId}/OrderDetail
@Entity
@Table(name = "OrderDetail")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customerOrder_id", nullable = false)
    @JsonBackReference
    private CustomerOrder customerOrder;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    @JsonBackReference
    private Product product;
    private LocalDate orderDate;
    private Long quantity;
    private Double priceCharged;

    public Long getId() {
        return id;
    }

    public CustomerOrder getCustomerOrder() {
        return customerOrder;
    }

    public void setCustomerOrder(CustomerOrder customerOrder) {
        this.customerOrder = customerOrder;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Double getPriceCharged() {
        return priceCharged;
    }

    public void setPriceCharged(Double priceCharged) {
        this.priceCharged = priceCharged;
    }
}
