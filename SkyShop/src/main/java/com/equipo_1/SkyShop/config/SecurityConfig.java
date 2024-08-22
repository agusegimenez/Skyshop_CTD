package com.equipo_1.SkyShop.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // Desactiva la protección CSRF
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/users/register", "/api/users/login").permitAll()  // Permite el acceso sin autenticación a estos endpoints
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()  // Permite acceso a la documentación de Swagger sin autenticación
                        .requestMatchers("/api/users/**").permitAll()  // Solo usuarios con rol ADMIN pueden acceder a estos endpoints
                        .anyRequest().authenticated()  // Requiere autenticación para cualquier otra solicitud
                )
                .formLogin(withDefaults())  // Usa la configuración por defecto para el formulario de login
                .httpBasic(withDefaults());  // Usa la autenticación básica HTTP por defecto

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // Configura el codificador de contraseñas
    }
}