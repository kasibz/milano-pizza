package com.example.amCrudH2.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CustomerOrderRequest {
    private Long id;
    private Long telephone_id;
    private Long employee_id;

    public Long getId() {
        return id;
    }

    public Long getTelephone_id() {
        return telephone_id;
    }

    public Long getEmployee_id() {
        return employee_id;
    }
}
