package com.circuitbreaker.inventory_service.controller;

import com.circuitbreaker.inventory_service.dto.InventoryRequest;
import com.circuitbreaker.inventory_service.dto.InventoryResponse;
import com.circuitbreaker.inventory_service.service.InventoryService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(
            InventoryService inventoryService) {

        this.inventoryService = inventoryService;
    }

    @GetMapping
    public List<InventoryResponse> getInventory() {

        return inventoryService.getAllInventory();
    }

    @GetMapping("/{productId}")
    public ResponseEntity<InventoryResponse> getByProductId(
            @PathVariable Long productId) {

        return ResponseEntity.ok(
                inventoryService.getByProductId(productId)
        );
    }

    @PostMapping
    public ResponseEntity<InventoryResponse> createInventory(
            @Valid @RequestBody InventoryRequest request) {

        InventoryResponse response =
                inventoryService.createInventory(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/{productId}")
    public ResponseEntity<InventoryResponse> updateInventory(
            @PathVariable Long productId,
            @Valid @RequestBody InventoryRequest request) {

        return ResponseEntity.ok(
                inventoryService.updateInventory(
                        productId,
                        request
                )
        );
    }
}