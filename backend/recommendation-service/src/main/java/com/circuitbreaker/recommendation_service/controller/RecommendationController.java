package com.circuitbreaker.recommendation_service.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.circuitbreaker.recommendation_service.model.Recommendation;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    @GetMapping
    public List<Recommendation> getRecommendations() {

        return List.of(
                new Recommendation(
                        1L,
                        "Laptop",
                        "Popular among electronics customers"
                ),
                new Recommendation(
                        2L,
                        "Wireless Mouse",
                        "Frequently purchased with laptops"
                ),
                new Recommendation(
                        3L,
                        "Keyboard",
                        "Trending accessory"
                )
        );
    }
}