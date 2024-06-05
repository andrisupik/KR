package com.example.tvprogrambackend.controllers.payload.mappers;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.tvprogrambackend.controllers.payload.JwtToken;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface JwtTokenMapper {

    @Mapping(target = "expiresAt", dateFormat = "dd-MM-yyyy HH:mm:ss")
    JwtToken toPayload(DecodedJWT jwt);

}
