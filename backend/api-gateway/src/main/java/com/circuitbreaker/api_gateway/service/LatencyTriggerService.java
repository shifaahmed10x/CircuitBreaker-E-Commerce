package com.circuitbreaker.api_gateway.service;

import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
public class LatencyTriggerService {

    private final DiscoveryClient discoveryClient;

    public LatencyTriggerService(DiscoveryClient discoveryClient) {
        this.discoveryClient = discoveryClient;
    }

    public Object triggerLatency(int delay) {

        List<ServiceInstance> instances =
                discoveryClient.getInstances("RECOMMENDATION-SERVICE");

        if (instances.isEmpty()) {
            throw new IllegalStateException(
                    "Recommendation Service is unavailable"
            );
        }

        ServiceInstance instance = instances.get(0);

        RestClient restClient = RestClient.builder()
                .baseUrl(instance.getUri().toString())
                .build();

        return restClient.get()
                .uri("/api/recommendations/slow?delay=" + delay)
                .retrieve()
                .body(Object.class);
    }
}