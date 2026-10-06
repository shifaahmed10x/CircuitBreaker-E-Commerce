package com.circuitbreaker.inventory_service.dto;

import java.time.LocalDateTime;

public class InventoryResponse {

   private Long id;
private Long productId;
private Integer quantity;
private Integer reservedQuantity;
private Integer availableQuantity;
private Integer reorderLevel;
private String warehouse;
private String supplier;
private LocalDateTime lastUpdated;
private Boolean lowStock;

    public InventoryResponse() {
    }

    public InventoryResponse(
            Long id,
            Long productId,
            Integer quantity,
            Integer reservedQuantity,
            Integer availableQuantity,
            Integer reorderLevel,
            Boolean lowStock,
            String warehouse,
            String supplier,
            LocalDateTime lastUpdated) {

        this.id = id;
        this.productId = productId;
        this.quantity = quantity;
        this.reservedQuantity = reservedQuantity;
        this.availableQuantity = availableQuantity;
        this.reorderLevel = reorderLevel;
        this.lowStock= lowStock;
        this.warehouse = warehouse;
        this.supplier = supplier;
        this.lastUpdated = lastUpdated;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getReservedQuantity() {
        return reservedQuantity;
    }

    public void setReservedQuantity(Integer reservedQuantity) {
        this.reservedQuantity = reservedQuantity;
    }

     public Integer getAvailableQuantity() {
        return availableQuantity;
    }

    public void setAvailableQuantity(Integer availableQuantity) {
        this.availableQuantity = availableQuantity;
    }

    public Integer getReorderLevel() {
        return reorderLevel;
    }

    public void setReorderLevel(Integer reorderLevel) {
        this.reorderLevel = reorderLevel;
    }

     public Boolean getlowStock() {
        return lowStock;
    }

    public void setlowStock(Boolean lowStock) {
        this.lowStock = lowStock;
    }

    public String getWarehouse() {
        return warehouse;
    }

    public void setWarehouse(String warehouse) {
        this.warehouse = warehouse;
    }

    public String getSupplier() {
        return supplier;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    
}