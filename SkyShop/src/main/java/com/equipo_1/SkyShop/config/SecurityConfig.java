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
                        .requestMatchers("/api/users/register", "/api/users/login", "/api/users").permitAll()  // Permite el acceso sin autenticación a estos endpoints
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()  // Permite acceso a la documentación de Swagger sin autenticación
                        .requestMatchers("/api/**").permitAll()  // Permite acceso a los endpoints de items sin autenticación
                        .requestMatchers("/api/orders/**").permitAll()  // Permite acceso a los endpoints de órdenes sin autenticación
                        .requestMatchers("/api/calendar/**").permitAll()  // Permite acceso a los endpoints de calendario sin autenticación
                        .requestMatchers("/api/carts/**").permitAll()  // Permite acceso a los endpoints del carrito sin autenticación
                        .requestMatchers("/api/items/**").permitAll()
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