package com.circuitbreaker.api_gateway.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.circuitbreaker.api_gateway.dto.ServiceStatusResponse;
import com.netflix.appinfo.InstanceInfo;
import com.netflix.discovery.EurekaClient;

@Service
public class ServiceStatusService {

    private final EurekaClient eurekaClient;

    public ServiceStatusService(EurekaClient eurekaClient) {
        this.eurekaClient = eurekaClient;
    }

    public List<ServiceStatusResponse> getServiceStatus() {

        List<ServiceStatusResponse> services = new ArrayList<>();

        String[] serviceNames = {
                "PRODUCT-SERVICE",
                "INVENTORY-SERVICE",
                "RECOMMENDATION-SERVICE"
        };

        for (String serviceName : serviceNames) {

            var application = eurekaClient.getApplication(serviceName);

            // Service is not registered in Eureka
            if (application == null) {
                services.add(
                        new ServiceStatusResponse(
                                serviceName,
                                "-",
                                0,
                                "DOWN"
                        )
                );

                continue;
            }

            List<InstanceInfo> instances =
                    application.getInstances();

            for (InstanceInfo instance : instances) {

                services.add(
                        new ServiceStatusResponse(
                                serviceName,
                                instance.getHostName(),
                                instance.getPort(),
                                instance.getStatus().name()
                        )
                );
            }
        }

        return services;
    }
}