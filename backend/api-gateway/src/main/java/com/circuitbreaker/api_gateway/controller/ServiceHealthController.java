package com.circuitbreaker.api_gateway.controller;

import java.util.List;
import java.util.Map;

import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServiceHealthController {

    private final DiscoveryClient discoveryClient;

    public ServiceHealthController(
            DiscoveryClient discoveryClient) {
        this.discoveryClient = discoveryClient;
    }

    @GetMapping("/api/monitoring/services")
    public Map<String, String> getServiceHealth() {

        return Map.of(
                "product",
                getStatus("PRODUCT-SERVICE"),

                "inventory",
                getStatus("INVENTORY-SERVICE"),

                "recommendation",
                getStatus("RECOMMENDATION-SERVICE")
        );
    }

    private String getStatus(String serviceName) {

        List<ServiceInstance> instances =
                discoveryClient.getInstances(serviceName);

        return instances.isEmpty()
                ? "DOWN"
                : "UP";
    }
}