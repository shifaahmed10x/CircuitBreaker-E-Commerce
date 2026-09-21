package com.circuitbreaker.inventory_service.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.circuitbreaker.inventory_service.model.Inventory;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @GetMapping
    public List<Inventory> getInventory() {
        return List.of(
                new Inventory(1L, 25, true),
                new Inventory(2L, 100, true),
                new Inventory(3L, 0, false)
        );
    }
}