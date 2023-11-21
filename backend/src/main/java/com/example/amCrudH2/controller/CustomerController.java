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

@CrossOrigin("http://localhost:5173")

@RestController
public class CustomerController {

    @Autowired
    private CustomerRepo customerRepo;
    @Autowired
    private ZipcodeRepo zipcodeRepo;

    @GetMapping("/customer")
    public ResponseEntity<List<CustomerRepo.CustomerWithZipcodeId>>getAllCustomers() {
        try {
            List<CustomerRepo.CustomerWithZipcodeId> customerList = customerRepo.findAllWithZipcodeId();

            if (customerList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(customerList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/customer/{id}")
    public ResponseEntity<CustomerRepo.CustomerWithZipcodeId> getCustomerById(@PathVariable Long id) {

        Optional<CustomerRepo.CustomerWithZipcodeId> customerData = customerRepo.findByIdWithZipcode(id);

        return customerData.map(customer -> new ResponseEntity<>(customer, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // since customer is in the list of customers under a zipcode, we must retrieve the zipcode parent
    // we instantiate the customer and set its parent!
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
    public ResponseEntity<Customer> updateCustomerById(@PathVariable Long id, @RequestBody Customer newCustomer) {
        Optional<Customer> oldCustomerData = customerRepo.findById(id);

        if (oldCustomerData.isPresent()) {
            Customer existingCustomer = oldCustomerData.get();

            // I should update the non primary fields here with existing customer then make updated later
            if (newCustomer.getStreetAddress() != null) {
                existingCustomer.setStreetAddress(newCustomer.getStreetAddress());
            }

            if (newCustomer.getZipcode() != null) {
                existingCustomer.setZipcode(newCustomer.getZipcode());
            }

            // make new object with updated values and give option to change telephone ID
            Customer updatedCustomer = new Customer();
            // changed to new telephoneID
            updatedCustomer.setTelephoneID(newCustomer.getTelephoneID());
            updatedCustomer.setStreetAddress(existingCustomer.getStreetAddress());
            updatedCustomer.setZipcode(existingCustomer.getZipcode());

            Customer savedCustomer = customerRepo.save(updatedCustomer);
            return new ResponseEntity<>(savedCustomer, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/customer/{id}")
    public ResponseEntity<HttpStatus> deleteZipcodeById(@PathVariable Long id) {
        customerRepo.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
