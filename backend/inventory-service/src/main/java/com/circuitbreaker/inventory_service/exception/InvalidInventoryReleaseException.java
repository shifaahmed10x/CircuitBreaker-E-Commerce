package com.circuitbreaker.inventory_service.exception;

public class InvalidInventoryReleaseException
        extends RuntimeException {

    public InvalidInventoryReleaseException(
            Long inventoryId,
            Integer requested,
            Integer reserved) {

        super(
            "Cannot release " + requested
            + " units for inventory id " + inventoryId
            + ". Reserved quantity is only " + reserved
        );
    }
}