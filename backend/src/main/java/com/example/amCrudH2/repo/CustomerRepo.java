package com.example.amCrudH2.repo;

import com.example.amCrudH2.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepo extends JpaRepository<Customer, Long> {
    @Query("SELECT c FROM Customer c WHERE c.zipcode.zipcodeID = :zipcode_id")
    List<Customer> findByZipcodeID(@Param("zipcode_id") Long zipcodeId);
}
