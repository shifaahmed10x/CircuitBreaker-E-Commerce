package com.circuitbreaker.recommendation_service.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.circuitbreaker.recommendation_service.dto.RecommendationResponse;
import com.circuitbreaker.recommendation_service.service.RecommendationService;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(
            RecommendationService recommendationService) {

        this.recommendationService = recommendationService;
    }

    @GetMapping
    public List<RecommendationResponse> getRecommendations() {

        return recommendationService.getRecommendations();
    }

    @GetMapping("/slow")
    public List<RecommendationResponse> getSlowRecommendations()
            throws InterruptedException {

        return recommendationService.getSlowRecommendations();
    }
}