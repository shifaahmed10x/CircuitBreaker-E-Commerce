package com.circuitbreaker.inventory_service.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.circuitbreaker.inventory_service.dto.InventoryRequest;
import com.circuitbreaker.inventory_service.dto.InventoryResponse;
import com.circuitbreaker.inventory_service.service.InventoryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping
    public List<InventoryResponse> getAllInventory() {
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

        InventoryResponse response =
                inventoryService.updateInventory(
                        productId,
                        request
                );

        return ResponseEntity.ok(response);
    }
}