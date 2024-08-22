package com.equipo_1.SkyShop.config;

import com.equipo_1.SkyShop.entity.User;
import com.equipo_1.SkyShop.entity.enums.UserRole;
import com.equipo_1.SkyShop.service.implementations.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(UserService userService, PasswordEncoder passwordEncoder) {
        return args -> {
            // Crear un usuario hardcodeado
            String username = "admin8";
            String email = "admin8@example.com";
            String password = "Adminpassword"; // Usa el PasswordEncoder para encriptar la contraseña

            User user = new User(
                    null,
                    UserRole.ADMIN,
                    username,
                    email,
                    password,
                    null, // Esto será seatido por la base de datos
                    null  // Esto será setiado por la base de datos
            );

            // Registrar el usuario en la base de datos
            userService.registerUser(user);
        };
    }
}
