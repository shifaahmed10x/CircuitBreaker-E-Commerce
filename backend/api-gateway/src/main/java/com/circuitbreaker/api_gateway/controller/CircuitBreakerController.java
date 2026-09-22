package com.circuitbreaker.api_gateway.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.resilience4j.circuitbreaker.CircuitBreaker;
import io.github.resilience4j.circuitbreaker.CircuitBreakerRegistry;

@RestController
@RequestMapping("/api/circuit-breaker")
public class CircuitBreakerController {

    private final CircuitBreakerRegistry circuitBreakerRegistry;

    public CircuitBreakerController(
            CircuitBreakerRegistry circuitBreakerRegistry) {

        this.circuitBreakerRegistry = circuitBreakerRegistry;
    }

    @GetMapping("/recommendation")
    public Map<String, Object> getRecommendationCircuitBreaker() {

        CircuitBreaker circuitBreaker =
                circuitBreakerRegistry
                        .circuitBreaker("recommendationCircuitBreaker");

        CircuitBreaker.Metrics metrics =
                circuitBreaker.getMetrics();

        return Map.of(
                "name", circuitBreaker.getName(),
                "state", circuitBreaker.getState().name(),
                "failureRate", metrics.getFailureRate(),
                "numberOfBufferedCalls",
                    metrics.getNumberOfBufferedCalls(),
                "numberOfFailedCalls",
                    metrics.getNumberOfFailedCalls(),
                "numberOfSuccessfulCalls",
                    metrics.getNumberOfSuccessfulCalls()
        );
    }
}