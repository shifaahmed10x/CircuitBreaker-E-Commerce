package com.circuitbreaker.api_gateway.config;

import java.net.URI;

import static org.springframework.cloud.gateway.server.mvc.filter.CircuitBreakerFilterFunctions.circuitBreaker;
import static org.springframework.cloud.gateway.server.mvc.filter.LoadBalancerFilterFunctions.lb;
import static org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions.route;
import static org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions.http;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import static org.springframework.web.servlet.function.RequestPredicates.path;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

@Configuration
public class GatewayRoutesConfig {

    @Bean
    public RouterFunction<ServerResponse> recommendationCircuitBreakerRoute() {

        return route("recommendation-circuit-breaker")
                .route(path("/api/recommendations/**"), http())
                .filter(lb("RECOMMENDATION-SERVICE"))
                .filter(
                        circuitBreaker(
                                "recommendationCircuitBreaker",
                                URI.create("forward:/fallback/recommendations")
                        )
                )
                .build();
    }
}