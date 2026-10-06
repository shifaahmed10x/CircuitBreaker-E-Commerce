package com.circuitbreaker.inventory_service.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class InventoryReleaseRequest {

    @NotNull(message = "Release quantity is required")
    @Positive(message = "Release quantity must be greater than zero")
    private Integer quantity;

    public InventoryReleaseRequest() {
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}