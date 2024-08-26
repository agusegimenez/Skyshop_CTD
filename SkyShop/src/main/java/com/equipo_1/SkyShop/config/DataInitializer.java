package com.equipo_1.SkyShop.config;

import com.equipo_1.SkyShop.entity.User;
import com.equipo_1.SkyShop.entity.enums.UserRole;
import com.equipo_1.SkyShop.service.implementations.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(UserService userService, PasswordEncoder passwordEncoder) {
        return args -> {
            if(userService.findByEmail("sysadmin@example.com").isEmpty()) {
                userService.registerUser(User.builder()
                        .role(UserRole.ADMIN)
                        .username("sa")
                        .email("sysadmin@example.com")
                        .password("Admin")
                        .createdAt(LocalDateTime.now())
                        .build());
            }
        };
    }
}