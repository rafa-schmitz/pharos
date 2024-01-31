package com.application.faros.repositories;

import com.application.faros.model.AuthenticationToken;
import com.application.faros.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import java.util.Optional;

public interface AuthTokenRepository extends JpaRepository<AuthenticationToken,Long> {
    Optional<AuthenticationToken> findByAccessToken(String accessToken);
    Optional<AuthenticationToken> findByRefreshToken(String refreshToken);
    @Modifying
    void deleteByUser(User user);
}
