package com.example.amCrudH2.model;

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
    @ManyToOne
    @JoinColumn(name="zipcode_id", nullable = false)
    private Zipcode zipcode; // <-- needs to be a foreign key look that up!

}



