package com.circuitbreaker.recommendation_service.service;

import com.circuitbreaker.recommendation_service.dto.RecommendationResponse;
import io.github.resilience4j.bulkhead.annotation.Bulkhead;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecommendationService {

    public List<RecommendationResponse> getRecommendations() {
        return List.of(
            new RecommendationResponse(
                101L,
                "Wireless Headphones",
                "Popular among similar customers"
            ),
            new RecommendationResponse(
                102L,
                "Smart Watch",
                "Trending this week"
            ),
            new RecommendationResponse(
                103L,
                "Mechanical Keyboard",
                "Frequently purchased together"
            )
        );
    }

    @Bulkhead(
        name = "recommendationBulkhead",
        type = Bulkhead.Type.SEMAPHORE
    )
    public List<RecommendationResponse> getSlowRecommendations()
            throws InterruptedException {

        Thread.sleep(10_000);

        return getRecommendations();
    }
}