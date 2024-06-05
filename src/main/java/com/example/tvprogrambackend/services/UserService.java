package com.example.tvprogrambackend.services;


import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.tvprogrambackend.model.User;

import java.nio.file.AccessDeniedException;

public interface UserService {

    User findByUsername(String username);

    void signUp(String username, String password);

    DecodedJWT signIn(String username, String password) throws AccessDeniedException;
}
