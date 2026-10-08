package com.circuitbreaker.inventory_service.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.circuitbreaker.inventory_service.dto.InventoryReleaseRequest;
import com.circuitbreaker.inventory_service.dto.InventoryRequest;
import com.circuitbreaker.inventory_service.dto.InventoryReservationRequest;
import com.circuitbreaker.inventory_service.dto.InventoryResponse;
import com.circuitbreaker.inventory_service.exception.InsufficientInventoryException;
import com.circuitbreaker.inventory_service.exception.InvalidInventoryReleaseException;
import com.circuitbreaker.inventory_service.exception.InventoryNotFoundException;
import com.circuitbreaker.inventory_service.mapper.InventoryMapper;
import com.circuitbreaker.inventory_service.model.Inventory;
import com.circuitbreaker.inventory_service.repository.InventoryRepository;

@Service
public class InventoryService {

        private final InventoryRepository inventoryRepository;
        private final InventoryMapper inventoryMapper;

        public InventoryService(
                        InventoryRepository inventoryRepository,
                        InventoryMapper inventoryMapper) {

                this.inventoryRepository = inventoryRepository;
                this.inventoryMapper = inventoryMapper;
        }

        public InventoryResponse createInventory(
                        InventoryRequest request) {

                Inventory inventory = inventoryMapper.toEntity(request);

                inventory.setReservedQuantity(0);
                inventory.setLastUpdated(LocalDateTime.now());

                Inventory savedInventory = inventoryRepository.save(inventory);

                return inventoryMapper.toResponse(savedInventory);
        }


        public List<InventoryResponse> getAllInventory() {

                return inventoryRepository.findAll()
                                .stream()
                                .map(inventoryMapper::toResponse)
                                .toList();
        }

    public InventoryResponse getInventoryById(Long id){
        Inventory inventory = inventoryRepository.findById(id)
        .orElseThrow(
                () -> new InventoryNotFoundException(id)
        );
        return inventoryMapper.toResponse(inventory);
    }

    public InventoryResponse updateInventory(Long id , InventoryRequest request){
        Inventory existingInventory = inventoryRepository.findById(id)
        .orElseThrow(
                () -> new InventoryNotFoundException(id)

        );

existingInventory.setProductId(request.getProductId());
    existingInventory.setQuantity(request.getQuantity());
    existingInventory.setReorderLevel(request.getReorderLevel());
    existingInventory.setWarehouse(request.getWarehouse());
    existingInventory.setSupplier(request.getSupplier());

    existingInventory.setLastUpdated(LocalDateTime.now());

   Inventory updatedInventory =
            inventoryRepository.save(existingInventory);

    return inventoryMapper.toResponse(updatedInventory);

    }
    public void deleteInventory(Long id) {

    if (!inventoryRepository.existsById(id)) {
        throw new InventoryNotFoundException(id);
    }

    inventoryRepository.deleteById(id);
}

public InventoryResponse reserveInventory(
        Long id,
        InventoryReservationRequest request) {

    Inventory inventory =
            inventoryRepository.findById(id)
                    .orElseThrow(
                            () -> new InventoryNotFoundException(id)
                    );

    int availableQuantity =
            inventory.getQuantity()
                    - inventory.getReservedQuantity();

    if (request.getQuantity() > availableQuantity) {
        throw new InsufficientInventoryException(
                id,
                request.getQuantity(),
                availableQuantity
        );
    }

    inventory.setReservedQuantity(
            inventory.getReservedQuantity()
                    + request.getQuantity()
    );

    inventory.setLastUpdated(LocalDateTime.now());

    Inventory savedInventory =
            inventoryRepository.save(inventory);

    return inventoryMapper.toResponse(savedInventory);
}

public InventoryResponse releaseInventory(
        Long id,
        InventoryReleaseRequest request) {

    Inventory inventory =
            inventoryRepository.findById(id)
                    .orElseThrow(
                            () -> new InventoryNotFoundException(id)
                    );

    if (request.getQuantity()
            > inventory.getReservedQuantity()) {

        throw new InvalidInventoryReleaseException(
                id,
                request.getQuantity(),
                inventory.getReservedQuantity()
        );
    }

    inventory.setReservedQuantity(
            inventory.getReservedQuantity()
                    - request.getQuantity()
    );

    inventory.setLastUpdated(LocalDateTime.now());

    Inventory savedInventory =
            inventoryRepository.save(inventory);

    return inventoryMapper.toResponse(savedInventory);
}
public List<InventoryResponse> getInventoryByProductId(Long productId) {

    return inventoryRepository.findByProductId(productId)
            .stream()
            .map(inventoryMapper::toResponse)
            .toList();
}
}