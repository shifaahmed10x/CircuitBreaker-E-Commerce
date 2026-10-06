package com.circuitbreaker.recommendation_service.dto;

public class RecommendationResponse {

    private Long productId;
    private String productName;
    private String reason;

    public RecommendationResponse() {
    }

    public RecommendationResponse(
            Long productId,
            String productName,
            String reason) {

        this.productId = productId;
        this.productName = productName;
        this.reason = reason;
    }

    public Long getProductId() {
        return productId;
    }

    public String getProductName() {
        return productName;
    }

    public String getReason() {
        return reason;
    }
}