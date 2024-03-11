package com.ted.milanopizza.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CustomerRequest {
    private Long telephoneID;
    private String streetAddress;
    private Long zipcode_id;

    public Long getZipcode_id() {
        return zipcode_id;
    }

    public Long getTelephoneID() {
        return this.telephoneID;
    }

    public String getStreetAddress() {
        return this.streetAddress;
    }
}
