package com.ted.milanopizza.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Customer")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Customer {
    @Id
    @JsonProperty("telephoneID")
    private Long telephoneID;
    private String streetAddress;
    // customer can also have many customerOrders, but not implemented, just made a route to show them

    // we're saying that customer is the many and that zipcode is a fk
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="zipcode_id", nullable = false)
    @JsonBackReference
    private Zipcode zipcode; // <-- needs to be a foreign key look that up!

    @Override
    public String toString() {
        return "Customer{" +
                "telephoneID=" + telephoneID +
                ", streetAddress='" + streetAddress + '\'' +
                ", zipcode=" + (zipcode != null ? zipcode.getZipcodeID() : null) +
                '}';
    }
}



