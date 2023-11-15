package com.example.amCrudH2.controller;

import com.example.amCrudH2.model.Customer;
import com.example.amCrudH2.model.Zipcode;
import com.example.amCrudH2.repo.CustomerRepo;
import com.example.amCrudH2.repo.ZipcodeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class ZipcodeController {

    @Autowired
    private ZipcodeRepo zipcodeRepo;
    @Autowired
    private CustomerRepo customerRepo;

    // get all zipcodes
    @GetMapping("/zipcode")
    public ResponseEntity<List<Zipcode>> getAllZipcodes() {
        try {
            List<Zipcode> zipcodeList = new ArrayList<>();
            zipcodeRepo.findAll().forEach(zipcodeList::add);

            if (zipcodeList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(zipcodeList, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/zipcode/{id}")
    public ResponseEntity<Zipcode> getZipcodeById(@PathVariable Long id) {
        Optional<Zipcode> zipcodeData = zipcodeRepo.findById(id);

        if (zipcodeData.isPresent()) {

            return new ResponseEntity<>(zipcodeData.get(), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/zipcode")
    public ResponseEntity<Zipcode> addZipcode(@RequestBody Zipcode zipcode) {

        Zipcode zipcodeObj = zipcodeRepo.save(zipcode);

        return new ResponseEntity<>(zipcodeObj, HttpStatus.OK);
    }

    @PostMapping("/zipcode/{id}")
    public ResponseEntity<Zipcode> updateZipcodeById(@PathVariable Long id, @RequestBody Zipcode newZipcodeData) {
        Optional<Zipcode> oldZipcodeData = zipcodeRepo.findById(id);

        if (oldZipcodeData.isPresent()) {
            Zipcode updatedZipcodeData = oldZipcodeData.get();

            // Check and update fields if they are present in the JSON request
            if (newZipcodeData.getZipcodeID() != null) {
                updatedZipcodeData.setZipcodeID(newZipcodeData.getZipcodeID());
            }
            if (newZipcodeData.getState() != null) {
                updatedZipcodeData.setState(newZipcodeData.getState());
            }
            if (newZipcodeData.getCity() != null) {
                updatedZipcodeData.setCity(newZipcodeData.getCity());
            }
            if (newZipcodeData.getCustomers() != null) {
                updatedZipcodeData.setCustomers(newZipcodeData.getCustomers());
            }

            // new entity here

            Zipcode zipcodeObj = zipcodeRepo.save(updatedZipcodeData);
            return new ResponseEntity<>(zipcodeObj, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/zipcode/{id}")
    public ResponseEntity<HttpStatus> deleteZipcodeById(@PathVariable Long id) {
        zipcodeRepo.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
