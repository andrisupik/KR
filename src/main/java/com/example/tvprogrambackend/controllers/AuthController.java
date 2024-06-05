package com.example.tvprogrambackend.controllers;

import com.example.tvprogrambackend.controllers.payload.Credentials;
import com.example.tvprogrambackend.controllers.payload.JwtToken;
import com.example.tvprogrambackend.controllers.payload.mappers.JwtTokenMapper;
import com.example.tvprogrambackend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtTokenMapper jwtTokenMapper;

    @PostMapping("/sign-up")
    public void signUp(@RequestBody @Valid Credentials credentials) {
        userService.signUp(credentials.getUsername(), credentials.getPassword());
    }

    @PostMapping("/sign-in")
    public JwtToken signIn(@RequestBody @Valid Credentials credentials) throws AccessDeniedException {
        return jwtTokenMapper.toPayload(
                userService.signIn(credentials.getUsername(), credentials.getPassword())
        );
    }

}
