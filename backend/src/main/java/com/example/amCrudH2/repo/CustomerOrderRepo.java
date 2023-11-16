package com.example.amCrudH2.repo;

import com.example.amCrudH2.model.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CustomerOrderRepo extends JpaRepository<CustomerOrder, Long> {
    // an interesting note is that I could only retrieve these Ids by making sure the casing was exact with aliases below
    public interface CustomerOrderWithAssociations {
        Long getID();
        Long getTelephoneID();
        Long getEmployeeID();
        // Include other fields from CustomerOrder if needed
    }

    // to get all customerOrders
    @Query("SELECT co.ID as ID, co.customer.telephoneID as telephoneID, co.employee.ID as employeeID FROM CustomerOrder co")
    List<CustomerOrderWithAssociations> findAllWithAssociations();

    // used to get one customerOrder with id
    @Query("SELECT co.ID as ID, co.customer.telephoneID as telephoneID, co.employee.ID as employeeID FROM CustomerOrder co WHERE co.customer.telephoneID = :telephoneId")
    List<CustomerOrderWithAssociations> findByIdWithAssociations(@Param("telephoneId") Long Id);
}
