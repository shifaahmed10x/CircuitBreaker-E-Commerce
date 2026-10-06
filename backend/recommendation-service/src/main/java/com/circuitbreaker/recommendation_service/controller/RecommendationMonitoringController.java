package com.circuitbreaker.recommendation_service.controller;

import io.github.resilience4j.bulkhead.Bulkhead;
import io.github.resilience4j.bulkhead.BulkheadRegistry;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class RecommendationMonitoringController {

    private final BulkheadRegistry bulkheadRegistry;

    public RecommendationMonitoringController(
            BulkheadRegistry bulkheadRegistry) {

        this.bulkheadRegistry = bulkheadRegistry;
    }

    @GetMapping("/api/monitoring/resilience")
    public Map<String, Object> getResilienceStatus() {

        Bulkhead bulkhead =
                bulkheadRegistry.bulkhead(
                        "recommendationBulkhead"
                );

        return Map.of(
                "bulkhead", Map.of(
                        "name", bulkhead.getName(),
                        "availableConcurrentCalls",
                        bulkhead.getMetrics()
                                .getAvailableConcurrentCalls(),
                        "maxConcurrentCalls",
                        bulkhead.getMetrics()
                                .getMaxAllowedConcurrentCalls()
                )
        );
    }
}