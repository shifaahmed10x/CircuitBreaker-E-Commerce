package com.circuitbreaker.inventory_service.exception;

import jakarta.servlet.http.HttpServletRequest;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.MethodArgumentNotValidException;


@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InventoryNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleInventoryNotFound(
            InventoryNotFoundException exception,
            HttpServletRequest request) {

        ErrorResponse response = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.NOT_FOUND.value(),
                "Not Found",
                exception.getMessage(),
                request.getRequestURI()
        );

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<ErrorResponse> handleValidationException(
        MethodArgumentNotValidException exception,
        HttpServletRequest request) {

    String message = exception.getBindingResult() // contain validation result
            .getFieldErrors() // gets errors 
            .stream()
            .map(error ->
                    error.getField()
                            + ": "
                            + error.getDefaultMessage())
            .findFirst()
            .orElse("Invalid request");

    ErrorResponse response = new ErrorResponse(
            LocalDateTime.now(),
            HttpStatus.BAD_REQUEST.value(),
            "Bad Request",
            message,
            request.getRequestURI()
    );

    return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(response);
}

@ExceptionHandler(InsufficientInventoryException.class)
public ResponseEntity<ErrorResponse> handleInsufficientInventory(
        InsufficientInventoryException exception,
        HttpServletRequest request) {

    ErrorResponse response = new ErrorResponse(
            LocalDateTime.now(),
            HttpStatus.BAD_REQUEST.value(),
            "Bad Request",
            exception.getMessage(),
            request.getRequestURI()
    );

    return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(response);
}
@ExceptionHandler(InvalidInventoryReleaseException.class)
public ResponseEntity<ErrorResponse> handleInvalidInventoryRelease(
        InvalidInventoryReleaseException exception,
        HttpServletRequest request) {

    ErrorResponse response = new ErrorResponse(
            LocalDateTime.now(),
            HttpStatus.BAD_REQUEST.value(),
            "Bad Request",
            exception.getMessage(),
            request.getRequestURI()
    );

    return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(response);
}
}