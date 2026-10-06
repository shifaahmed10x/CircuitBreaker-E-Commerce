package com.circuitbreaker.api_gateway.dto;

import java.util.Map;

public class ResilienceMonitoringResponse {

    private Map<String, Object> circuitBreaker;
    private Map<String, Object> rateLimiter;
    private Map<String, Object> bulkhead;

    public ResilienceMonitoringResponse() {
    }

    public ResilienceMonitoringResponse(
            Map<String, Object> circuitBreaker,
            Map<String, Object> rateLimiter,
            Map<String, Object> bulkhead) {

        this.circuitBreaker = circuitBreaker;
        this.rateLimiter = rateLimiter;
        this.bulkhead = bulkhead;
    }

    public Map<String, Object> getCircuitBreaker() {
        return circuitBreaker;
    }

    public void setCircuitBreaker(Map<String, Object> circuitBreaker) {
        this.circuitBreaker = circuitBreaker;
    }

    public Map<String, Object> getRateLimiter() {
        return rateLimiter;
    }

    public void setRateLimiter(Map<String, Object> rateLimiter) {
        this.rateLimiter = rateLimiter;
    }

    public Map<String, Object> getBulkhead() {
        return bulkhead;
    }

    public void setBulkhead(Map<String, Object> bulkhead) {
        this.bulkhead = bulkhead;
    }
}