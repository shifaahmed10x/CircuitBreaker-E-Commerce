package com.circuitbreaker.inventory_service.mapper;

import com.circuitbreaker.inventory_service.dto.InventoryRequest;
import com.circuitbreaker.inventory_service.dto.InventoryResponse;
import com.circuitbreaker.inventory_service.model.Inventory;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface InventoryMapper {

    Inventory toEntity(InventoryRequest request);

    @Mapping(
        target = "availableQuantity",
        expression = "java(inventory.getQuantity() - inventory.getReservedQuantity())"
    )
    @Mapping(
        target = "lowStock",
        expression = "java((inventory.getQuantity() - inventory.getReservedQuantity()) <= inventory.getReorderLevel())"
    )
    InventoryResponse toResponse(Inventory inventory);
}