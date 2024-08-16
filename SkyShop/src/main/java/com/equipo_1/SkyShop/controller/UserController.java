package com.equipo_1.SkyShop.controller;

import com.equipo_1.SkyShop.dto.request.UserRequestDTO;
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

public class UserController {
    @RestController
    @RequestMapping("/api/users")
    public class UserController {

        private final UserService userService;

        public UserController(UserService userService) {
            this.userService = userService;
        }

        @PostMapping("/register")
        public ResponseEntity<UserResponseDTO> register(@RequestBody UserRequestDTO userRequestDTO) {
            User user = userService.registerUser(new User(null, userRequestDTO.getUsername(),
                    userRequestDTO.getEmail(), userRequestDTO.getPassword(),
                    UserRole.CLIENT, LocalDateTime.now(), null));
            return ResponseEntity.ok(new UserResponseDTO(user.getId(), user.getUsername(), user.getEmail(), user.getRole()));
        }

        @PostMapping("/login")
        public ResponseEntity<UserResponseDTO> login(@RequestBody UserLoginDTO userLoginDTO) {
            User user = userService.loginUser(userLoginDTO.getEmail(), userLoginDTO.getPassword());
            return ResponseEntity.ok(new UserResponseDTO(user.getId(), user.getUsername(), user.getEmail(), user.getRole()));
        }
    }
}
