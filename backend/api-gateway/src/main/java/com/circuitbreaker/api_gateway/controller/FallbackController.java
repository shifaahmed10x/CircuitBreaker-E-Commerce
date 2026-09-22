package com.circuitbreaker.api_gateway.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FallbackController {

    @GetMapping("/fallback/recommendations")
    public Map<String, Object> recommendationFallback() {

        return Map.of(
            "status", "fallback",
            "message", "Recommendation service is temporarily unavailable",
            "recommendations", List.of(
                "Laptop",
                "Wireless Mouse",
                "Keyboard"
            )
        );
    }
}