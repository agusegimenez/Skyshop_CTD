package com.equipo_1.SkyShop.service.implementations;

import com.equipo_1.SkyShop.entity.EmailRequest;
import com.equipo_1.SkyShop.entity.User;
import com.equipo_1.SkyShop.entity.enums.UserRole;
import com.equipo_1.SkyShop.repository.UserRepository;
import com.equipo_1.SkyShop.service.IUserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final CartService cartService;  // Añadimos el CartService

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, EmailService emailService, CartService cartService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
        this.cartService = cartService;  // Inicializamos el CartService
    }

    @Override
    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreatedAt(LocalDateTime.now());
        if (user.getRole() == null) {
            user.setRole(UserRole.CLIENT);
        }
        User savedUser = userRepository.save(user);

        // Crear carrito vacío para el usuario
        cartService.createCart(savedUser.getId());

        // Enviar email al usuario registrado
        String subject = "Bienvenido a SkyShop!";
        String body = "Hola " + savedUser.getUsername() + ",\n\nGracias por registrarte en SkyShop.\nTus credenciales son:\nEmail: " + savedUser.getEmail() + "\n\nEsperamos que pronto puedas hacer tu pedido!";

        EmailRequest emailRequest = new EmailRequest(savedUser.getEmail(), subject, body);
        emailService.sendEmail(emailRequest);

        return savedUser;
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

    public Optional<User> findByEmail(String email) {return userRepository.findByEmail(email);}

    public User updateUserRole(Long id, UserRole role) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setRole(role);
            return userRepository.save(user);
        } else {
            throw new IllegalArgumentException("User not found");
        }
    }

    public List<User> listAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}

