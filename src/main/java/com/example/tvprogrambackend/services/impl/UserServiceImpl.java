package com.example.tvprogrambackend.services.impl;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.tvprogrambackend.model.Role;
import com.example.tvprogrambackend.model.User;
import com.example.tvprogrambackend.repositories.RoleRepository;
import com.example.tvprogrambackend.repositories.UserRepository;
import com.example.tvprogrambackend.security.JwtProvider;
import com.example.tvprogrambackend.services.UserService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;

@Data
@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private JwtProvider jwtProvider;
    private RoleRepository roleRepository;
    private PasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Autowired
    public UserServiceImpl(UserRepository userRepository, JwtProvider jwtProvider, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
        this.roleRepository = roleRepository;
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    private User findByCredentials(String username, String password) {
        User user = userRepository.findByUsername(username);
            if (encoder.matches(password, user.getPassword())) {
                return user;
            }
        throw new IllegalArgumentException("Wrong credentials!");
    }

    @Override
    public void signUp(String username, String password) {
        if (userRepository.existsByUsername(username))
            throw new IllegalArgumentException("User with username %s already exists".formatted(username));
        User user = new User();
        user.setUsername(username);
        user.setPassword(encoder.encode(password));
        List<Role> roles = new ArrayList<>();
        roles.add(roleRepository.findByName("ROLE_USER"));
        user.setRoles(roles);
        userRepository.save(user);
    }

    @Override
    public DecodedJWT signIn(String username, String password) throws AccessDeniedException {
        User user = findByCredentials(username, password);
        return jwtProvider
                .toDecodedJWT(
                        jwtProvider.generateToken(user.getUsername(), user.getRoles())
                )
                .orElseThrow(() -> new AccessDeniedException("Invalid username and/or password"));
    }
}
