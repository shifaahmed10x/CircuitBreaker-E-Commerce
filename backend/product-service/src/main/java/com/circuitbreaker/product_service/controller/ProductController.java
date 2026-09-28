package com.circuitbreaker.product_service.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.circuitbreaker.product_service.client.InventoryClient;
import com.circuitbreaker.product_service.dto.ProductInventoryResponse;
import com.circuitbreaker.product_service.model.Product;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final InventoryClient inventoryClient;

    public ProductController(InventoryClient inventoryClient) {
        this.inventoryClient = inventoryClient;
    }

    @GetMapping
    public List<Product> getProducts() {
        return List.of(
                new Product(1L, "Laptop", 65000, "Electronics"),
                new Product(2L, "Wireless Mouse", 1200, "Accessories"),
                new Product(3L, "Keyboard", 2500, "Accessories")
        );
    }

    @GetMapping("/{productId}/inventory")
    public ProductInventoryResponse getProductInventory(
            @PathVariable Long productId) {

        Product product = getProducts()
                .stream()
                .filter(p -> p.getId().equals(productId))
                .findFirst()
                .orElseThrow(() ->
                        new RuntimeException(
                                "Product not found: " + productId
                        )
                );

        Map<String, Object> inventory =
                inventoryClient.getInventoryByProductId(productId);

        return new ProductInventoryResponse(
                product,
                inventory
        );
    }
}