package com.circuitbreaker.product_service.dto;

import java.util.Map;

import com.circuitbreaker.product_service.model.Product;

public class ProductInventoryResponse {

    private Product product;
    private Map<String, Object> inventory;

    public ProductInventoryResponse() {
    }

    public ProductInventoryResponse(
            Product product,
            Map<String, Object> inventory) {

        this.product = product;
        this.inventory = inventory;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Map<String, Object> getInventory() {
        return inventory;
    }

    public void setInventory(Map<String, Object> inventory) {
        this.inventory = inventory;
    }
}