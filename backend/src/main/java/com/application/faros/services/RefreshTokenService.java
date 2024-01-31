package com.application.faros.services;

import com.application.faros.model.AuthenticationToken;
import com.application.faros.model.User;
import com.application.faros.repositories.AuthTokenRepository;
import com.application.faros.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final AuthTokenRepository authTokenRepository;
    private final UserRepository userRepository;

    @Value("${api.security.token.refresh.expiration_min}")
    private String expirationMin;

    public AuthenticationToken generateRefreshToken(Long userId, String accessToken) {
        User user = userRepository.findById(userId).orElseThrow();
        var authToken = new AuthenticationToken();
        authToken.setExp(expirationDate());
        authToken.setAccessToken(accessToken);
        authToken.setRefreshToken(UUID.randomUUID().toString());
        authToken.setUser(user);
        authTokenRepository.save(authToken);
        return authToken;
    }

    private LocalDateTime expirationDate() {
        return LocalDateTime
                .now()
                .plusMinutes(Integer.parseInt(expirationMin));
    }

    public AuthenticationToken verifyRefreshToken(String refreshToken) {
        var token = authTokenRepository.findByRefreshToken(refreshToken).orElseThrow();
        boolean isValidToken = token.getExp().isAfter(LocalDateTime.now());
        if (!isValidToken) {
            authTokenRepository.deleteById(token.getId());
            throw new RuntimeException("Invalid refresh token");

        }
        return token;
    }
}
