package com.circuitbreaker.inventory_service.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.circuitbreaker.inventory_service.dto.InventoryRequest;
import com.circuitbreaker.inventory_service.dto.InventoryResponse;
import com.circuitbreaker.inventory_service.exception.InventoryNotFoundException;
import com.circuitbreaker.inventory_service.model.Inventory;
import com.circuitbreaker.inventory_service.repository.InventoryRepository;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public List<InventoryResponse> getAllInventory() {

        return inventoryRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public InventoryResponse getByProductId(Long productId) {

        Inventory inventory = inventoryRepository
                .findByProductId(productId)
                .orElseThrow(() ->
                        new InventoryNotFoundException(productId)
                );

        return toResponse(inventory);
    }

    public InventoryResponse createInventory(
            InventoryRequest request) {

        Inventory inventory = new Inventory();

        inventory.setProductId(request.getProductId());
        inventory.setQuantity(request.getQuantity());

        inventory.setAvailable(
                request.getQuantity() > 0
        );

        Inventory savedInventory =
                inventoryRepository.save(inventory);

        return toResponse(savedInventory);
    }

    public InventoryResponse updateInventory(
            Long productId,
            InventoryRequest request) {

        Inventory inventory = inventoryRepository
                .findByProductId(productId)
                .orElseThrow(() ->
                        new InventoryNotFoundException(productId)
                );

        inventory.setQuantity(request.getQuantity());

        inventory.setAvailable(
                request.getQuantity() > 0
        );

        Inventory updatedInventory =
                inventoryRepository.save(inventory);

        return toResponse(updatedInventory);
    }

    private InventoryResponse toResponse(
            Inventory inventory) {

        return new InventoryResponse(
                inventory.getId(),
                inventory.getProductId(),
                inventory.getQuantity(),
                inventory.isAvailable()
        );
    }
}