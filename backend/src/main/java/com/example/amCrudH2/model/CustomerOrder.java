package com.example.amCrudH2.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "CustomerOrder")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class CustomerOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="telephone_id", nullable = false)
    @JsonBackReference
    private Customer customer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="employee_id", nullable = false)
    @JsonBackReference
    private Employee employee;

    public Long getId() {
        return id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
