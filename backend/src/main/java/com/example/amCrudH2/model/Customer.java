package com.example.amCrudH2.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Customer")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class Customer {
    @Id
    @JsonProperty("telephoneID")
    private Long telephoneID;
    private String streetAddress;

    // we're saying that customer is the many and that zipcode is a fk
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="zipcode_id", nullable = false)
    @JsonBackReference
    private Zipcode zipcode; // <-- needs to be a foreign key look that up!


    public Zipcode getZipcode () {
        return this.zipcode;
    }

    public void setZipcode(Zipcode zipcode) {

        this.zipcode = zipcode;
    }

    public void setTelephoneID(Long telephoneID) {
        this.telephoneID = telephoneID;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public Long getTelephoneID() {
        return telephoneID;
    }
}



