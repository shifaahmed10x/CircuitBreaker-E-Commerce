package com.circuitbreaker.product_service.repository;

import com.circuitbreaker.product_service.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
// findAll()
// findById()
// save()
// deleteById()
// existsById()
// count()
}