package com.circuitbreaker.api_gateway.filter;

import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.github.resilience4j.ratelimiter.RateLimiter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class RateLimitFilter extends OncePerRequestFilter {

    private final RateLimiter rateLimiter;

    public RateLimitFilter(RateLimiter rateLimiter) {
        this.rateLimiter = rateLimiter;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        if (rateLimiter.acquirePermission()) {

            filterChain.doFilter(request, response);

        } else {

            response.setStatus(429);
            response.setContentType("application/json");

            response.getWriter().write("""
                {
                    "error": "Too Many Requests",
                    "message": "Rate limit exceeded. Please try again later."
                }
                """);
        }
    }
}