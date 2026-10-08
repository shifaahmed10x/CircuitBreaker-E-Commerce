package com.circuitbreaker.recommendation_service.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.circuitbreaker.recommendation_service.dto.RecommendationResponse;

import io.github.resilience4j.bulkhead.annotation.Bulkhead;

@Service
public class RecommendationService {

    public List<RecommendationResponse> getRecommendations() {

        return List.of(

                new RecommendationResponse(
                        1L,
                        "Gentle Hydrating Cleanser",
                        "A customer favourite for a simple everyday routine",
                        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80"
                ),

                new RecommendationResponse(
                        3L,
                        "Daily Barrier Moisturizer",
                        "Comforting hydration for everyday skin",
                        "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=800&q=80"
                ),

                new RecommendationResponse(
                        4L,
                        "Everyday SPF 50",
                        "An everyday essential for daily protection",
                        "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
                )
        );
    }

    @Bulkhead(
            name = "recommendationBulkhead",
            type = Bulkhead.Type.SEMAPHORE
    )
    public List<RecommendationResponse> getRecommendationsWithLatency(
            int delaySeconds
    ) throws InterruptedException {

        if (delaySeconds > 0) {
            Thread.sleep(delaySeconds * 1000L);
        }

        return getRecommendations();
    }
}