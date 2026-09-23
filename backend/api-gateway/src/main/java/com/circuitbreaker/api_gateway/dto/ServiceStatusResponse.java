package com.circuitbreaker.api_gateway.dto;

public class ServiceStatusResponse {

    private String name;
    private String host;
    private int port;
    private String status;

    public ServiceStatusResponse(
            String name,
            String host,
            int port,
            String status) {

        this.name = name;
        this.host = host;
        this.port = port;
        this.status = status;
    }

    public String getName() {
        return name;
    }

    public String getHost() {
        return host;
    }

    public int getPort() {
        return port;
    }

    public String getStatus() {
        return status;
    }
}