package com.circuitbreaker.product_service.mapper;

import com.circuitbreaker.product_service.dto.ProductRequest;
import com.circuitbreaker.product_service.dto.ProductResponse;
import com.circuitbreaker.product_service.model.Product;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    Product toEntity(ProductRequest request);

    ProductResponse toResponse(Product product);
}