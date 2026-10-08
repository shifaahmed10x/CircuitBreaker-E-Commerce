package com.circuitbreaker.api_gateway.controller;

import java.util.List;
import java.util.Map;

import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;

@RestController
public class ServiceHealthController {

    private final DiscoveryClient discoveryClient;

    public ServiceHealthController(DiscoveryClient discoveryClient) {
        this.discoveryClient = discoveryClient;
    }

    @GetMapping("/api/monitoring/services")
    public Map<String, String> getServiceHealth() {

        return Map.of(
                "product", checkService("PRODUCT-SERVICE"),
                "inventory", checkService("INVENTORY-SERVICE"),
                "recommendation", checkService("RECOMMENDATION-SERVICE")
        );
    }

    private String checkService(String serviceName) {

        try {
            List<ServiceInstance> instances =
                    discoveryClient.getInstances(serviceName);

            if (instances.isEmpty()) {
                return "DOWN";
            }

            ServiceInstance instance = instances.get(0);

            RestClient restClient = RestClient.builder()
                    .baseUrl(instance.getUri().toString())
                    .build();

            ResponseEntity<String> response = restClient.get()
                    .uri("/actuator/health")
                    .retrieve()
                    .toEntity(String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                return "UP";
            }

            return "DOWN";

        } catch (Exception exception) {
            return "DOWN";
        }
    }
}