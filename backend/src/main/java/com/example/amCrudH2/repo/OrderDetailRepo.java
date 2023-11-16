package com.example.amCrudH2.repo;

import com.example.amCrudH2.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface OrderDetailRepo extends JpaRepository<OrderDetail, Long> {

    public interface OrderDetailWithAssociations {
        Long getID();
        Long getCustomerOrderID();
        Long getProductID();
        LocalDate getOrderDate();
        Long getQuantity();
        Double getPriceCharged();
    }

    // write query to get the right stuff
    @Query("SELECT od.ID as ID, od.customerOrder.ID as customerOrderID, od.product.productID as productID, od.orderDate as orderDate, od.quantity as quantity, od.priceCharged as priceCharged FROM OrderDetail od WHERE od.customerOrder.ID = :customerOrderId")
    List<OrderDetailWithAssociations> findODByIdWithAssociations(@Param("customerOrderId") Long Id);
}
