package com.circuitbreaker.product_service.dto;

public class ProductResponse {

    private Long id;
    private String name;
    private Double price;
    private String category;
    private String description;
    private String image;
    private Double rating;
    private Integer reviews;


    public ProductResponse() {
    }


    public ProductResponse(
            Long id,
            String name,
            Double price,
            String category,
            String description,
            String image,
            Double rating,
            Integer reviews
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.description = description;
        this.image = image;
        this.rating = rating;
        this.reviews = reviews;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }


    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }


    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }


    public Integer getReviews() {
        return reviews;
    }

    public void setReviews(Integer reviews) {
        this.reviews = reviews;
    }
}