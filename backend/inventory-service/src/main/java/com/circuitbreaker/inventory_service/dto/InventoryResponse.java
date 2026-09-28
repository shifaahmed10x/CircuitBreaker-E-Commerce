package com.circuitbreaker.inventory_service.dto;

public class InventoryResponse {

    private Long id;
    private Long productId;
    private int quantity;
    private boolean available;

    public InventoryResponse(
            Long id,
            Long productId,
            int quantity,
            boolean available) {

        this.id = id;
        this.productId = productId;
        this.quantity = quantity;
        this.available = available;
    }

    public Long getId() {
        return id;
    }

    public Long getProductId() {
        return productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public boolean isAvailable() {
        return available;
    }
}