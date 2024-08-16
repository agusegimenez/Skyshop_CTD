package com.equipo_1.SkyShop.service.implementations;

import com.equipo_1.SkyShop.entity.User;
import com.equipo_1.SkyShop.entity.enums.UserRole;
import com.equipo_1.SkyShop.repository.UserRepository;
import com.equipo_1.SkyShop.service.IUserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreatedAt(LocalDateTime.now());
        user.setRole(UserRole.CLIENT);
        return userRepository.save(user);
    }

    @Override
    public User loginUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            return user.get();
        } else {
            throw new IllegalArgumentException("Invalid credentials");
        }
    }

    @Override
    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }
}
