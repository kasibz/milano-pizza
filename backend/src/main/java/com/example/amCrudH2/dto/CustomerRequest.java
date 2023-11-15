package com.example.amCrudH2.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CustomerRequest {
    private Long telephoneID;
    private String streetAddress;
    private Long zipcode_id;

    public Long getZipcodeId() {
        return this.zipcode_id;
    }

    public Long getTelephoneID() {
        return this.telephoneID;
    }

    public String getStreetAddress() {
        return this.streetAddress;
    }
}
