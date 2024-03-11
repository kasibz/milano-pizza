package com.ted.milanopizza.controller;

import com.ted.milanopizza.dto.CustomerOrderRequest;
import com.ted.milanopizza.model.Customer;
import com.ted.milanopizza.model.CustomerOrder;
import com.ted.milanopizza.model.Employee;
import com.ted.milanopizza.repo.CustomerOrderRepo;
import com.ted.milanopizza.repo.CustomerRepo;
import com.ted.milanopizza.repo.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:5173")

@RestController
public class CustomerOrderController {
    @Autowired
    private CustomerOrderRepo customerOrderRepo;
    @Autowired
    private CustomerRepo customerRepo;
    @Autowired
    private EmployeeRepo employeeRepo;



    @GetMapping("/customerOrder")
    public ResponseEntity<List<CustomerOrderRepo.CustomerOrderWithAssociations>> getAllCustomerOrdersWithAssociations() {
        try {
            List<CustomerOrderRepo.CustomerOrderWithAssociations> customerOrderList = customerOrderRepo.findAllWithAssociations();

            if (customerOrderList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(customerOrderList, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/customerOrder/{id}")
    public ResponseEntity<List<CustomerOrderRepo.CustomerOrderWithAssociations>> getCustomerOrderById(@PathVariable Long id) {
        List<CustomerOrderRepo.CustomerOrderWithAssociations> customerOrderData = customerOrderRepo.findByCustomerOrderIdWithAssociations(id);

        if (!customerOrderData.isEmpty()) {

            return new ResponseEntity<>(customerOrderData, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // this should ideally grab orders either by employee or customer
    @GetMapping("customer/{id}/customerOrder")
    public ResponseEntity<List<CustomerOrderRepo.CustomerOrderWithAssociations>> getCustomerOrderByCustomerId(@PathVariable Long id) {
        List<CustomerOrderRepo.CustomerOrderWithAssociations> customerOrderData = customerOrderRepo.findByIdWithAssociations(id);
        if (customerOrderData.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(customerOrderData, HttpStatus.OK);
    }

    @GetMapping("zipcode/{id}/customerOrder")
    public ResponseEntity<List<CustomerOrderRepo.CustomerOrderWithAssociations>> getCustomerOrderByZipcode(@PathVariable Long id) {
        List<CustomerOrderRepo.CustomerOrderWithAssociations> customerOrderData = customerOrderRepo.findByZipcodeWithAssociations(id);
        if (customerOrderData.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(customerOrderData, HttpStatus.OK);
    }

    @GetMapping("employee/{id}/customerOrder")
    public ResponseEntity<List<CustomerOrderRepo.CustomerOrderWithAssociations>> getCustomerOrderByEmployeeID(@PathVariable Long id) {
        List<CustomerOrderRepo.CustomerOrderWithAssociations> customerOrderData = customerOrderRepo.findByEmployeeIDWithAssociations(id);
        if (customerOrderData.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(customerOrderData, HttpStatus.OK);
    }


    // I prefer a DTO to transfer the ID's in a clean way
    // this needs to get added to both customer and employee customerOrder lists!
    @PostMapping("/customerOrder")
    public ResponseEntity<CustomerOrder> addCustomerOrder(@RequestBody CustomerOrderRequest customerOrderRequest) {
        // find customer and employee and associate with this order
        Optional<Customer> customerOptional = customerRepo.findById(customerOrderRequest.getTelephone_id());
        Optional<Employee> employeeOptional = employeeRepo.findById(customerOrderRequest.getEmployee_id());
        if (!customerOptional.isPresent() || !employeeOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        // retrieve customer and employee from db
        Customer existingCustomer = customerOptional.get();
        Employee existingEmployee = employeeOptional.get();

        // instantiate customerOrder and set the values
        CustomerOrder customerOrder = new CustomerOrder();
        customerOrder.setCustomer(existingCustomer);
        customerOrder.setEmployee(existingEmployee);

        // save to db and return OK response
        customerOrderRepo.save(customerOrder);
        return new ResponseEntity<>(customerOrder, HttpStatus.OK);

    }

    @PostMapping("/customerOrder/{id}")
    public ResponseEntity<CustomerOrder> updateCustomerOrderById(@PathVariable Long id, @RequestBody CustomerOrder newCustomerOrder)
    {
        Optional<CustomerOrder> oldCustomerOrder = customerOrderRepo.findById(id);

        if(oldCustomerOrder.isPresent())
        {
            CustomerOrder updatedCustomerOrder = oldCustomerOrder.get();
            if(newCustomerOrder.getCustomerOrderDate() != null)
            {
                updatedCustomerOrder.setCustomerOrderDate(newCustomerOrder.getCustomerOrderDate());
            }
            //
            CustomerOrder customerOrderObj = customerOrderRepo.save(updatedCustomerOrder);
            return new ResponseEntity<>(customerOrderObj, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
