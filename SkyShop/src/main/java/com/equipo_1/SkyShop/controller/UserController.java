package com.equipo_1.SkyShop.controller;

import com.equipo_1.SkyShop.dto.request.UserRequestDTO;
import com.equipo_1.SkyShop.dto.request.UserLoginDTO;
import com.equipo_1.SkyShop.dto.response.UserResponseDTO;
import com.equipo_1.SkyShop.entity.User;
import com.equipo_1.SkyShop.entity.enums.UserRole;
import com.equipo_1.SkyShop.service.implementations.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@RequestBody UserRequestDTO userRequestDTO) {
        User user = new User(
                null,
                UserRole.CLIENT,
                userRequestDTO.getUsername(),
                userRequestDTO.getEmail(),
                userRequestDTO.getPassword(),
                LocalDateTime.now(),
                null
        );
        user = userService.registerUser(user);
        return ResponseEntity.ok(new UserResponseDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getCreatedAt().toString(),
                user.getUpdatedAt() != null ? user.getUpdatedAt().toString() : null
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponseDTO> login(@RequestBody UserLoginDTO userLoginDTO) {
        User user = userService.loginUser(userLoginDTO.getEmail(), userLoginDTO.getPassword());
        return ResponseEntity.ok(new UserResponseDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getCreatedAt().toString(),
                user.getUpdatedAt() != null ? user.getUpdatedAt().toString() : null
        ));
    }
}