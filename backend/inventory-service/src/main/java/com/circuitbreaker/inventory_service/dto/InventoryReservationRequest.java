package com.circuitbreaker.inventory_service.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class InventoryReservationRequest {

    @NotNull(message = "Reservation quantity is required")
    @Positive(message = "Reservation quantity must be greater than zero")
    private Integer quantity;

    public InventoryReservationRequest() {
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}