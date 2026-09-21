package com.circuitbreaker.inventory_service.model;

public class Inventory {

    private Long productId;
    private int quantity;
    private boolean available;

    public Inventory() {
    }

    public Inventory(Long productId, int quantity, boolean available) {
        this.productId = productId;
        this.quantity = quantity;
        this.available = available;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }
}