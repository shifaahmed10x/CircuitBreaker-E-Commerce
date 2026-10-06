package com.circuitbreaker.api_gateway.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.circuitbreaker.api_gateway.client.RecommendationMonitoringClient;

import io.github.resilience4j.circuitbreaker.CircuitBreaker;
import io.github.resilience4j.circuitbreaker.CircuitBreakerRegistry;
import io.github.resilience4j.ratelimiter.RateLimiter;

@RestController
public class MonitoringController {

    private final CircuitBreakerRegistry circuitBreakerRegistry;
    private final RateLimiter rateLimiter;
    private final RecommendationMonitoringClient recommendationMonitoringClient;

    public MonitoringController(
            CircuitBreakerRegistry circuitBreakerRegistry,
            RateLimiter rateLimiter,
            RecommendationMonitoringClient recommendationMonitoringClient) {

        this.circuitBreakerRegistry = circuitBreakerRegistry;
        this.rateLimiter = rateLimiter;
        this.recommendationMonitoringClient =
                recommendationMonitoringClient;
    }

    @GetMapping("/api/monitoring/resilience")
    public Map<String, Object> getResilienceStatus() {

        CircuitBreaker circuitBreaker =
                circuitBreakerRegistry.circuitBreaker(
                        "recommendationCircuitBreaker"
                );

        Map<String, Object> bulkheadStatus =
                recommendationMonitoringClient.getBulkheadStatus();

        Map<String, Object> response = new HashMap<>();

        response.put(
                "circuitBreaker",
                Map.of(
                        "name", circuitBreaker.getName(),
                        "state", circuitBreaker.getState().name()
                )
        );

        response.put(
                "rateLimiter",
                Map.of(
                        "name", rateLimiter.getName(),
                        "availablePermissions",
                        rateLimiter.getMetrics()
                                .getAvailablePermissions()
                )
        );

        response.put(
                "bulkhead",
                bulkheadStatus
        );

        return response;
    }
}