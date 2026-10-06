package com.circuitbreaker.product_service.dto;

public class ProductResponse {

    private Long id;
    private String name;
    private Double price;
    private String category;

    public ProductResponse() {
    }

    public ProductResponse(
            Long id,
            String name,
            Double price,
            String category) {

        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Double getPrice() {
        return price;
    }

    public String getCategory() {
        return category;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public void setCategory(String category) {
        this.category = category;
    }

}