package com.circuitbreaker.product_service.controller;

import com.circuitbreaker.product_service.model.Product;
import com.circuitbreaker.product_service.service.ProductService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
 
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    
    @GetMapping
    public List<Product> getProducts() {
       return productService.getAllProducts();
    }
}