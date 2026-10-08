package com.circuitbreaker.api_gateway.config;

import java.time.Duration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.github.resilience4j.ratelimiter.RateLimiter;

@Configuration
public class RateLimiterConfig {

    @Bean
    public RateLimiter gatewayRateLimiter() {

        io.github.resilience4j.ratelimiter.RateLimiterConfig config = io.github.resilience4j.ratelimiter.RateLimiterConfig
                .custom()
                .limitForPeriod(5)
                .limitRefreshPeriod(Duration.ofSeconds(1))
                .timeoutDuration(Duration.ZERO)
                .build();

        return RateLimiter.of("gatewayRateLimiter", config);
    }
}