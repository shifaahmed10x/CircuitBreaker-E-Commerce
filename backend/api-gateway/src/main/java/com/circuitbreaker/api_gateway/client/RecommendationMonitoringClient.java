package com.circuitbreaker.api_gateway.client;

import java.util.List;
import java.util.Map;

import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class RecommendationMonitoringClient {

    private final DiscoveryClient discoveryClient;

    public RecommendationMonitoringClient(
            DiscoveryClient discoveryClient) {

        this.discoveryClient = discoveryClient;
    }

    public Map<String, Object> getBulkheadStatus() {

        try {

            List<ServiceInstance> instances =
                    discoveryClient.getInstances(
                            "RECOMMENDATION-SERVICE"
                    );

            if (instances.isEmpty()) {
                return unavailableResponse(
                        "No Recommendation Service instance found"
                );
            }

            ServiceInstance instance = instances.get(0);

            RestClient restClient =
                    RestClient.builder()
                            .baseUrl(instance.getUri().toString())
                            .build();

            Map<String, Object> response =
                    restClient.get()
                            .uri("/api/monitoring/resilience")
                            .retrieve()
                            .body(Map.class);

            if (response == null) {
                return unavailableResponse(
                        "Empty response from Recommendation Service"
                );
            }

            Object bulkhead = response.get("bulkhead");

            if (bulkhead instanceof Map<?, ?> bulkheadMap) {

                @SuppressWarnings("unchecked")
                Map<String, Object> result =
                        (Map<String, Object>) bulkheadMap;

                return result;
            }

            return unavailableResponse(
                    "Bulkhead information not available"
            );

        } catch (Exception exception) {

            return unavailableResponse(
                    "Recommendation Service is unavailable"
            );
        }
    }

    private Map<String, Object> unavailableResponse(
            String reason) {

        return Map.of(
                "name", "recommendationBulkhead",
                "status", "UNAVAILABLE",
                "reason", reason
        );
    }
}
