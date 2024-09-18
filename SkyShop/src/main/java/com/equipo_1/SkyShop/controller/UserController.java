package com.equipo_1.SkyShop.controller;

import com.equipo_1.SkyShop.dto.request.UserRequestDTO;
import com.equipo_1.SkyShop.dto.request.UserLoginDTO;
import com.equipo_1.SkyShop.dto.request.UserRoleUpdateDTO;
import com.equipo_1.SkyShop.dto.response.UserResponseDTO;
import com.equipo_1.SkyShop.entity.User;
import com.equipo_1.SkyShop.entity.enums.UserRole;
import com.equipo_1.SkyShop.service.implementations.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

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
                LocalDateTime.now(),
                new HashSet<>(),
                new HashSet<>()
        );
        user = userService.registerUser(user);
        return ResponseEntity.ok(new UserResponseDTO(
                user.getId(),
                user.getRole(),
                user.getUsername(),
                user.getEmail(),
                user.getFavorites(),
                user.getCreatedAt().toString(),
                user.getUpdatedAt() != null ? user.getUpdatedAt().toString() : null
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponseDTO> login(@RequestBody UserLoginDTO userLoginDTO) {
        User user = userService.loginUser(userLoginDTO.getEmail(), userLoginDTO.getPassword());
        return ResponseEntity.ok(new UserResponseDTO(
                user.getId(),
                user.getRole(),
                user.getUsername(),
                user.getEmail(),
                user.getFavorites(),
                user.getCreatedAt().toString(),
                user.getUpdatedAt() != null ? user.getUpdatedAt().toString() : null
        ));
    }

    @PatchMapping("/{id}/role")
    public ResponseEntity<UserResponseDTO> updateUserRole(@PathVariable Long id, @RequestBody UserRoleUpdateDTO roleUpdateDTO) {
        User updatedUser = userService.updateUserRole(id, roleUpdateDTO.getRole());
        return ResponseEntity.ok(new UserResponseDTO(
                updatedUser.getId(),
                updatedUser.getRole(),
                updatedUser.getUsername(),
                updatedUser.getEmail(),
                updatedUser.getFavorites(),
                updatedUser.getCreatedAt().toString(),
                updatedUser.getUpdatedAt() != null ? updatedUser.getUpdatedAt().toString() : null
        ));
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> listAllUsers() {
        List<User> users = userService.listAllUsers();
        List<UserResponseDTO> userDTOs = users.stream()
                .map(user -> new UserResponseDTO(
                        user.getId(),
                        user.getRole(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getFavorites(),
                        user.getCreatedAt().toString(),
                        user.getUpdatedAt() != null ? user.getUpdatedAt().toString() : null
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(userDTOs);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{userId}/toggleFav/{itemId}")
    public ResponseEntity<Boolean> toggleFav(@PathVariable Long userId, @PathVariable Long itemId) {
        return ResponseEntity.ok(userService.toggleFav(userId, itemId));
    }
}