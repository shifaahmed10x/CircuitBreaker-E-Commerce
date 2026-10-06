package com.circuitbreaker.inventory_service.exception;

public class InsufficientInventoryException
        extends RuntimeException {

    public InsufficientInventoryException(
            Long inventoryId,
            Integer requested,
            Integer available) {

        super(
            "Insufficient inventory for id " + inventoryId
            + ". Requested: " + requested
            + ", Available: " + available
        );
    }
}