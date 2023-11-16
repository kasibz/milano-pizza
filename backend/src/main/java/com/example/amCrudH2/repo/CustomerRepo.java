package com.example.amCrudH2.repo;

import com.example.amCrudH2.dto.CustomerRequest;
import com.example.amCrudH2.model.Customer;
import com.example.amCrudH2.model.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

// No Update/Delete
@Repository
public interface CustomerRepo extends JpaRepository<Customer, Long> {

    // I want the customer to return zipcode Id
    // Define a projection interface
    public interface CustomerWithZipcodeId {
        Long getTelephoneID();
        String getStreetAddress();
        List<CustomerOrder> getCustomerOrders();
        Long getZipcodeId(); // Include the foreign key
    }

    // Use the projection in the query method
    @Query("SELECT c.telephoneID as telephoneID, c.streetAddress as streetAddress, c.customerOrders as customerOrders, c.zipcode.zipcodeID as zipcodeId FROM Customer c")
    List<CustomerWithZipcodeId> findAllWithZipcodeId();

    @Query("SELECT c.telephoneID as telephoneID, c.streetAddress as streetAddress, c.customerOrders as customerOrders, c.zipcode.zipcodeID as zipcodeId FROM Customer c WHERE c.telephoneID = :telephoneId")
    Optional<CustomerWithZipcodeId> findByIdWithZipcode(@Param("telephoneId") Long telephoneId);

    @Query("SELECT c.telephoneID as telephoneID, c.streetAddress as streetAddress, c.zipcode.zipcodeID as zipcodeId, co.id as customerOrderId FROM Customer c LEFT JOIN c.customerOrders co WHERE c.telephoneID = :telephoneId")
    List<CustomerRequest> findCustomerWithOrdersByTelephoneId(@Param("telephoneId") Long telephoneId);

}

