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
                "fallback", true,

                "message",
                "Our recommendation service is taking a little break.",

                "recommendations",
                List.of(

                        Map.of(
                                "productId", 1L,
                                "productName",
                                "Gentle Hydrating Cleanser",
                                "reason",
                                "A customer favourite for a simple everyday routine",
                                "image",
                                "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80"
                        ),

                        Map.of(
                                "productId", 3L,
                                "productName",
                                "Daily Barrier Moisturizer",
                                "reason",
                                "Comforting hydration for everyday skin",
                                "image",
                                "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=800&q=80"
                        ),

                        Map.of(
                                "productId", 4L,
                                "productName",
                                "Everyday SPF 50",
                                "reason",
                                "An everyday essential for daily protection",
                                "image",
                                "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
                        )
                )
        );
    }
}