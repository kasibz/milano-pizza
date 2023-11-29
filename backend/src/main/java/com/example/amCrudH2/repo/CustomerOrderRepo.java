package com.example.amCrudH2.repo;

import com.example.amCrudH2.model.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface CustomerOrderRepo extends JpaRepository<CustomerOrder, Long> {
    // an interesting note is that I could only retrieve these Ids by making sure the casing was exact with aliases below
    public interface CustomerOrderWithAssociations {
        Long getID();
        Long getTelephoneID();
        Long getEmployeeID();
        String getEmployeeFirstName();
        LocalDateTime getCustomerOrderDate();
        // Include other fields from CustomerOrder if needed
    }

    // to get all customerOrders
    @Query("SELECT co.ID as ID, co.customer.telephoneID as telephoneID, co.employee.ID as employeeID, co.employee.firstName as employeeFirstName, co.customerOrderDate as customerOrderDate FROM CustomerOrder co")
    List<CustomerOrderWithAssociations> findAllWithAssociations();

    @Query("SELECT co.ID as ID, co.customer.telephoneID as telephoneID, co.employee.ID as employeeID, co.employee.firstName as employeeFirstName, co.customerOrderDate as customerOrderDate FROM CustomerOrder co WHERE co.ID = :customerOrderId")
    List<CustomerOrderWithAssociations> findByCustomerOrderIdWithAssociations(@Param("customerOrderId") Long Id);

    // used to get one customerOrder with id
    @Query("SELECT co.ID as ID, co.customer.telephoneID as telephoneID, co.employee.ID as employeeID FROM CustomerOrder co WHERE co.customer.telephoneID = :telephoneId")
    List<CustomerOrderWithAssociations> findByIdWithAssociations(@Param("telephoneId") Long Id);

    @Query("SELECT co.ID as ID, co.customer.telephoneID as telephoneID, co.employee.ID as employeeID, co.employee.firstName as employeeFirstName, co.customerOrderDate as customerOrderDate FROM CustomerOrder co WHERE co.customer.zipcode.zipcodeID = :zipcodeId")
    List<CustomerOrderWithAssociations> findByZipcodeWithAssociations(@Param("zipcodeId") Long Id);

    @Query("SELECT co.ID as ID, co.customer.telephoneID as telephoneID, co.employee.ID as employeeID, co.employee.firstName as employeeFirstName, co.customerOrderDate as customerOrderDate FROM CustomerOrder co WHERE co.employee.id = :employeeId")
    List<CustomerOrderWithAssociations> findByEmployeeIDWithAssociations(@Param("employeeId") Long Id);
}
