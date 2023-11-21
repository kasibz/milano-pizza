package com.example.amCrudH2.controller;

import com.example.amCrudH2.dto.OrderDetailRequest;
import com.example.amCrudH2.model.CustomerOrder;
import com.example.amCrudH2.model.OrderDetail;
import com.example.amCrudH2.model.Product;
import com.example.amCrudH2.repo.CustomerOrderRepo;
import com.example.amCrudH2.repo.OrderDetailRepo;
import com.example.amCrudH2.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:5173")

@RestController
public class OrderDetailController {
    @Autowired
    private OrderDetailRepo orderDetailRepo;

    @Autowired
    private CustomerOrderRepo customerOrderRepo;

    @Autowired
    private ProductRepo productRepo;

    @GetMapping("customerOrder/{id}/orderDetail")
    public ResponseEntity<List<OrderDetailRepo.OrderDetailWithAssociations>> getOrderDetailByCustomerOrderId(@PathVariable Long id) {
        List<OrderDetailRepo.OrderDetailWithAssociations> orderDetailData = orderDetailRepo.findOrderDetailByCustomerOrderIdWithAssociations(id);
        if (orderDetailData.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(orderDetailData, HttpStatus.OK);
    }

    @GetMapping("product/{id}/orderDetail")
    public ResponseEntity<List<OrderDetailRepo.OrderDetailWithAssociations>> getOrderDetailByProductId(@PathVariable Long id) {
        List<OrderDetailRepo.OrderDetailWithAssociations> orderDetailData = orderDetailRepo.findOrderDetailByProductIdWithAssociations(id);
        if (orderDetailData.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(orderDetailData, HttpStatus.OK);
    }

    @PostMapping("customerOrder/{id}/orderDetail")
    public ResponseEntity<OrderDetail> addOrderDetail(@RequestBody OrderDetailRequest orderDetailRequest) {
        // find Customer Order and Product associated with this detail
        Optional<CustomerOrder> customerOrderOptional = customerOrderRepo.findById(orderDetailRequest.getCustomerOrder_id());
        Optional<Product> productOptional = productRepo.findById(orderDetailRequest.getProduct_id());
        if (!customerOrderOptional.isPresent() || !productOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // retreive those objects and populate new object with it
        CustomerOrder existingCustomerOrder = customerOrderOptional.get();
        Product existingProduct = productOptional.get();

        OrderDetail orderDetail = new OrderDetail();
        orderDetail.setCustomerOrder(existingCustomerOrder);
        orderDetail.setProduct(existingProduct);
        orderDetail.setOrderDate(orderDetailRequest.getOrderDate());
        orderDetail.setQuantity(orderDetailRequest.getQuantity());
        orderDetail.setDiscount(orderDetailRequest.getDiscount());
        orderDetail.setSubTotal(orderDetailRequest.getSubTotal());

        orderDetailRepo.save(orderDetail);
        return new ResponseEntity<>(orderDetail, HttpStatus.OK);

    }
}
