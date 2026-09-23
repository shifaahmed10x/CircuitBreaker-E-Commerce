package com.circuitbreaker.api_gateway.controller;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.circuitbreaker.api_gateway.service.ServiceStatusService;
import com.circuitbreaker.api_gateway.dto.ServiceStatusResponse;


@RestController
@RequestMapping("/api/services")
public class ServiceStatusController {

    private final ServiceStatusService serviceStatusService;

    public ServiceStatusController(ServiceStatusService serviceStatusService){
          this.serviceStatusService = serviceStatusService;
    }

    @GetMapping("/status")
    public List<ServiceStatusResponse> getServiceStatus() {
        return serviceStatusService.getServiceStatus();
    }
}