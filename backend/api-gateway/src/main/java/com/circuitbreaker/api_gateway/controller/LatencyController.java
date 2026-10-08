package com.circuitbreaker.api_gateway.controller;

import com.circuitbreaker.api_gateway.service.LatencyTriggerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/monitoring")
public class LatencyController {

    private final LatencyTriggerService latencyTriggerService;

    public LatencyController(
            LatencyTriggerService latencyTriggerService
    ) {
        this.latencyTriggerService = latencyTriggerService;
    }

    @PostMapping("/trigger-latency")
    public ResponseEntity<?> triggerLatency(
            @RequestParam(defaultValue = "5") int delay
    ) {

        if (delay < 1 || delay > 30) {
            return ResponseEntity.badRequest().body(
                    Map.of(
                            "error", "Invalid delay",
                            "message",
                            "Delay must be between 1 and 30 seconds"
                    )
            );
        }

        Object result = latencyTriggerService.triggerLatency(delay);

        return ResponseEntity.ok(
                Map.of(
                        "message", "Latency test completed",
                        "delay", delay,
                        "recommendations", result
                )
        );
    }
}