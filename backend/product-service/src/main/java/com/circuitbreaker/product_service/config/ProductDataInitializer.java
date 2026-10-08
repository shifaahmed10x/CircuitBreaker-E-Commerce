package com.circuitbreaker.product_service.config;

import com.circuitbreaker.product_service.model.Product;
import com.circuitbreaker.product_service.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ProductDataInitializer {

    @Bean
    CommandLineRunner loadProducts(ProductRepository productRepository) {

        return args -> {

            if (productRepository.count() > 0) {
                return;
            }

            productRepository.save(
                    new Product(
                            null,
                            "Gentle Hydrating Cleanser",
                            699.0,
                            "Cleanser",
                            "A gentle everyday cleanser that leaves skin feeling fresh, soft and comfortable.",
                            "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80",
                            4.8,
                            124
                    )
            );

            productRepository.save(
                    new Product(
                            null,
                            "Vitamin C Brightening Serum",
                            899.0,
                            "Serum",
                            "A lightweight vitamin C serum designed to support a fresh and healthy-looking glow.",
                            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
                            4.7,
                            96
                    )
            );

            productRepository.save(
                    new Product(
                            null,
                            "Daily Barrier Moisturizer",
                            799.0,
                            "Moisturizer",
                            "A comforting daily moisturizer that helps keep skin hydrated and nourished.",
                            "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=800&q=80",
                            4.9,
                            158
                    )
            );

            productRepository.save(
                    new Product(
                            null,
                            "Everyday SPF 50",
                            999.0,
                            "Sunscreen",
                            "Lightweight everyday sun protection designed for comfortable daily wear.",
                            "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
                            4.8,
                            211
                    )
            );

            productRepository.save(
                    new Product(
                            null,
                            "Overnight Repair Mask",
                            849.0,
                            "Mask",
                            "A nourishing overnight mask for a soft and refreshed feeling by morning.",
                            "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
                            4.6,
                            87
                    )
            );
        };
    }
}