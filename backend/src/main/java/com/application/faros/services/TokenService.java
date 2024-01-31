package com.application.faros.services;

import com.application.faros.model.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {
    @Value("${api.security.token.secret}")
    private String secret;
    @Value("${api.security.token.issuer}")
    private String issuer;
    @Value("${api.security.token.expiration_min}")
    private String expirationMin;

    public String generateToken(User user) {
        try {
            var algorithm = Algorithm.HMAC256(secret);
            return JWT
                    .create()
                    .withIssuer(issuer)
                    .withSubject(user.getId().toString())
                    .withExpiresAt(expirationDate())
                    .sign(algorithm);
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Error to the generate token.", exception);
        }
    }

    private Instant expirationDate() {
        return LocalDateTime
                .now()
                .plusMinutes(Long.parseLong(expirationMin))
                .toInstant(ZoneOffset.of("-03:00"));
    }
    private DecodedJWT verifyToken(String tokenJWT){
        var algorithm = Algorithm.HMAC256(secret);
        return JWT
                .require(algorithm)
                .withIssuer(issuer)
                .build()
                .verify(tokenJWT);
    }
    public String getSubject(String tokenJWT) {
        return verifyToken(tokenJWT)
                .getSubject();

    }
}
