package com.ted.milanopizza.controller;
import com.ted.milanopizza.model.Product;
import com.ted.milanopizza.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:5173")

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

    @PostMapping("product/{id}")
    public ResponseEntity<Product> updateProductById(@PathVariable Long id, @RequestBody Product newProduct)
    {
        Optional<Product> oldProduct = productRepo.findById(id);

        if(oldProduct.isPresent())
        {
            Product updatedProduct = oldProduct.get();
            if(newProduct.getPrice() != null)
            {
                updatedProduct.setPrice(newProduct.getPrice());
            }

            if(newProduct.getDiscount() != null) {
                updatedProduct.setDiscount(newProduct.getDiscount());
            }

            if(newProduct.getName() != null) {
                updatedProduct.setName(newProduct.getName());
            }

            if(newProduct.getImage() != null) {
                updatedProduct.setImage(newProduct.getImage());
            }
            //
            Product productObj = productRepo.save(updatedProduct);
            return new ResponseEntity<>(productObj, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
//
    @DeleteMapping("product/{id}")
    public ResponseEntity<HttpStatus> deleteProductById(@PathVariable Long id) {
        productRepo.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
