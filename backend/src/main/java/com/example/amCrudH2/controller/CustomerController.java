package com.example.amCrudH2.controller;

import com.example.amCrudH2.dto.CustomerRequest;
import com.example.amCrudH2.model.Customer;
import com.example.amCrudH2.model.Zipcode;
import com.example.amCrudH2.repo.CustomerRepo;
import com.example.amCrudH2.repo.ZipcodeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class CustomerController {

    @Autowired
    private CustomerRepo customerRepo;
    @Autowired
    private ZipcodeRepo zipcodeRepo;

    @GetMapping("/customer")
    public ResponseEntity<List<Customer>> getAllCustomers() {
        try {
            List<Customer> customerList = new ArrayList<>();
            customerRepo.findAll().forEach(customerList::add);

            if (customerList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(customerList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/customer/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
        Optional<Customer> customerData = customerRepo.findById(id);

        if (customerData.isPresent()) {
            return new ResponseEntity<>(customerData.get(), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/customer")
    public ResponseEntity<Customer> addCustomer(@RequestBody CustomerRequest customerRequest) {
        Optional<Zipcode> zipcodeOptional = zipcodeRepo.findById(customerRequest.getZipcodeId());
        if (!zipcodeOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Zipcode zipcode = zipcodeOptional.get();
        Customer customer = new Customer();
        customer.setTelephoneID(customerRequest.getTelephoneID());
        customer.setStreetAddress(customerRequest.getStreetAddress());
        customer.setZipcode(zipcode);
        customerRepo.save(customer);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    // update customer
    @PostMapping("/customer/{id}")
    public ResponseEntity<Customer> updateCustomerById(@PathVariable Long id, @RequestBody Customer newCustomerData) {
        Optional<Customer> oldCustomerData = customerRepo.findById(id);

        if (oldCustomerData.isPresent()) {
            Customer updatedCustomerData = oldCustomerData.get();

            // I should update the non primary fields here with existing customer then make updated later
            if (newCustomerData.getTelephoneID() != null) {
                updatedCustomerData.setTelephoneID(newCustomerData.getTelephoneID());
            }

            if (newCustomerData.getStreetAddress() != null) {
                updatedCustomerData.setStreetAddress(newCustomerData.getStreetAddress());
            }

            if (newCustomerData.getZipcode() != null) {
                updatedCustomerData.setZipcode(newCustomerData.getZipcode());
            }

            Customer customerObj = customerRepo.save(updatedCustomerData);
            return new ResponseEntity<>(customerObj, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/customer/{id}")
    public ResponseEntity<HttpStatus> deleteZipcodeById(@PathVariable Long id) {
        customerRepo.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
