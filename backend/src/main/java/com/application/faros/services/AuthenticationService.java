package com.application.faros.services;

import com.application.faros.model.User;
import com.application.faros.repositories.AuthTokenRepository;
import com.application.faros.serializers.RefreshTokenInputDTO;
import com.application.faros.serializers.TokenDTO;
import com.application.faros.serializers.TokenOutputDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final AuthenticationManager manager;
  private final RefreshTokenService refreshTokenService;
  private final TokenService tokenService;
  private final AuthTokenRepository authTokenRepository;

  public TokenOutputDTO login(TokenDTO input){
    var auth = new UsernamePasswordAuthenticationToken(
            input.getUsername(),
            input.getPassword()
    );
    var authenticated = manager.authenticate(auth);
    var user = (User) authenticated.getPrincipal();
    return generateAuthToken(user);
  }

  public TokenOutputDTO refreshToken(
          RefreshTokenInputDTO input
  ){
    var refreshToken = refreshTokenService.verifyRefreshToken(input.getRefreshToken());
    var user = refreshToken.getUser();
    return generateAuthToken(user);
  }

  private TokenOutputDTO generateAuthToken(User user){
    var token = tokenService.generateToken(user);
    var refreshToken = refreshTokenService.generateRefreshToken(user.getId(), token).getRefreshToken();
    return new TokenOutputDTO(token, refreshToken);
  }

  public void revokeToken(){
    var userAuth = (User)
            SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();
    authTokenRepository.deleteByUser(userAuth);
  }
}
