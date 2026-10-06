package com.circuitbreaker.inventory_service.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.circuitbreaker.inventory_service.model.Inventory;

@Repository
public interface InventoryRepository
        extends JpaRepository<Inventory, Long> {

    List<Inventory> findByProductId(Long productId);

    Optional<Inventory> findByProductIdAndWarehouse(
            Long productId,
            String warehouse);
}