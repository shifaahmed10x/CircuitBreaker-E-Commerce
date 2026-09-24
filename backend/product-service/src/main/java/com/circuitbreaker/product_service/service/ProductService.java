package com.circuitbreaker.product_service.service;

import com.circuitbreaker.product_service.model.Product;
import com.circuitbreaker.product_service.repository.ProductRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // GET all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // GET product by ID
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    // CREATE product
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    // UPDATE product
    public Product updateProduct(Long id, Product product) {

        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existingProduct.setName(product.getName());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setCategory(product.getCategory());

        return productRepository.save(existingProduct);
    }

    // DELETE product
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}