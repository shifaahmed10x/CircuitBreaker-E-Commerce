package com.circuitbreaker.recommendation_service.model;

public class Recommendation {

    private Long productId;
    private String productName;
    private String reason;

    public Recommendation() {
    }

    public Recommendation(Long productId, String productName, String reason) {
        this.productId = productId;
        this.productName = productName;
        this.reason = reason;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}