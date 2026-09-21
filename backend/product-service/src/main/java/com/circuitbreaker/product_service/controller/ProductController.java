package com.circuitbreaker.product_service.controller;

import com.circuitbreaker.product_service.model.Product;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @GetMapping
    public List<Product> getProducts() {
        return List.of(
                new Product(1L, "Laptop", 65000, "Electronics"),
                new Product(2L, "Wireless Mouse", 1200, "Accessories"),
                new Product(3L, "Keyboard", 2500, "Accessories")
        );
    }
}