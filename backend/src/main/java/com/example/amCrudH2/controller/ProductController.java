package com.example.amCrudH2.controller;

import com.example.amCrudH2.model.Product;
import com.example.amCrudH2.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
public class ProductController {
    @Autowired
    private ProductRepo productRepo;

    // get all products
    @GetMapping("/product")
    public ResponseEntity<List<Product>> getAllProducts() {
        try 
        {
            List<Product> productList = new ArrayList<>();
            productRepo.findAll().forEach(productList::add);

            if (productList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(productList, HttpStatus.OK);

        } 
        catch (Exception e) 
        {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/product/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> productData = productRepo.findById(id);

        if (productData.isPresent()) {
            return new ResponseEntity<>(productData.get(), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/product")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {

        Product productObj = productRepo.save(product);

        return new ResponseEntity<>(productObj, HttpStatus.OK);
    }

//    @PostMapping
//    public void updateProductById() {}
//
//    @DeleteMapping
//    public void deleteProductById() {}
}
