package com.example.amCrudH2.controller;

import com.example.amCrudH2.model.Employee;
import com.example.amCrudH2.model.Employee;
//import com.example.amCrudH2.model.Employee;
import com.example.amCrudH2.repo.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class EmployeeController {
    @Autowired
    private EmployeeRepo employeeRepo;

    @GetMapping("/employee")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        try {
            List<Employee> employeeList = new ArrayList<>();
            employeeRepo.findAll().forEach(employeeList::add);

            if (employeeList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(employeeList, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/employee/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Optional<Employee> employeeData = employeeRepo.findById(id);

        if (employeeData.isPresent()) {

            return new ResponseEntity<>(employeeData.get(), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/employee")
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {

        Employee employeeObj = employeeRepo.save(employee);

        return new ResponseEntity<>(employeeObj, HttpStatus.OK);
    }
    @PostMapping("/employee/{id}")
    public ResponseEntity<Employee> updateEmployeeById(@PathVariable Long id, @RequestBody Employee newEmployeeData) {
        Optional<Employee> oldEmployeeData = employeeRepo.findById(id);

        if (oldEmployeeData.isPresent()) {
            Employee updatedEmployeeData = oldEmployeeData.get();

            // Check and update fields if they are present in the JSON request
            if (newEmployeeData.getFirstName() != null) {
                updatedEmployeeData.setFirstName(newEmployeeData.getFirstName());
            }
            if (newEmployeeData.getLastName() != null) {
                updatedEmployeeData.setLastName(newEmployeeData.getLastName());
            }
            if (newEmployeeData.getStatus() != null) {
                updatedEmployeeData.setStatus(newEmployeeData.getStatus());
            }

            // new entity here

            Employee employeeObj = employeeRepo.save(updatedEmployeeData);
            return new ResponseEntity<>(employeeObj, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/employee/{id}")
    public ResponseEntity<HttpStatus> deleteEmployeeById(@PathVariable Long id) {
        employeeRepo.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
