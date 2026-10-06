package com.circuitbreaker.inventory_service.controller;

import com.circuitbreaker.inventory_service.dto.InventoryReleaseRequest;
import com.circuitbreaker.inventory_service.dto.InventoryRequest;
import com.circuitbreaker.inventory_service.dto.InventoryReservationRequest;
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

        public InventoryController(InventoryService inventoryService) {
                this.inventoryService = inventoryService;
        }

        @GetMapping
        public List<InventoryResponse> getAllInventory() {
                return inventoryService.getAllInventory();
        }

       @GetMapping("/{id}")
public ResponseEntity<InventoryResponse> getInventoryById(
        @PathVariable Long id) {

    return ResponseEntity.ok(
            inventoryService.getInventoryById(id)
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
@PutMapping("/{id}")
public ResponseEntity<InventoryResponse> updateInventory(
        @PathVariable Long id,
        @Valid @RequestBody InventoryRequest request) {

    InventoryResponse response =
            inventoryService.updateInventory(id, request);

    return ResponseEntity.ok(response);
}
@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteInventory(
        @PathVariable Long id) {

    inventoryService.deleteInventory(id);

    return ResponseEntity.noContent().build();
}
@PostMapping("/{id}/reserve")
public ResponseEntity<InventoryResponse> reserveInventory(
        @PathVariable Long id,
        @Valid @RequestBody InventoryReservationRequest request) {

    InventoryResponse response =
            inventoryService.reserveInventory(id, request);

    return ResponseEntity.ok(response);
}
@PostMapping("/{id}/release")
public ResponseEntity<InventoryResponse> releaseInventory(
        @PathVariable Long id,
        @Valid @RequestBody InventoryReleaseRequest request) {

    InventoryResponse response =
            inventoryService.releaseInventory(id, request);

    return ResponseEntity.ok(response);
}
}
