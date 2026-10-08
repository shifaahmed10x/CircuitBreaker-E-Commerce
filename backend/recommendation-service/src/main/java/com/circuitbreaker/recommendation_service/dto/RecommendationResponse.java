package com.circuitbreaker.recommendation_service.dto;
public class RecommendationResponse {

    private Long productId;
    private String productName;
    private String reason;
    private String image;

    public RecommendationResponse() {
    }

    public RecommendationResponse(
            Long productId,
            String productName,
            String reason,
            String image
    ) {
        this.productId = productId;
        this.productName = productName;
        this.reason = reason;
        this.image = image;
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}