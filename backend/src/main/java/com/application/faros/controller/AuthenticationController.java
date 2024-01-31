package com.application.faros.controller;

import com.application.faros.model.User;
import com.application.faros.repositories.AuthTokenRepository;
import com.application.faros.serializers.RefreshTokenInputDTO;
import com.application.faros.serializers.TokenOutputDTO;
import com.application.faros.serializers.TokenDTO;
import com.application.faros.services.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
public class AuthenticationController {
    private AuthenticationService service;
    public AuthenticationController(
            AuthenticationService service
    ){
        this.service = service;
    }
    @Transactional
    @PostMapping("/login")
    public ResponseEntity<TokenOutputDTO> login(@Valid @RequestBody TokenDTO input){
        var authToken =  service.login(input);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(authToken);
    }
    @Transactional
    @PostMapping("/login/refresh")
    public ResponseEntity<TokenOutputDTO> refresh(
            @Valid @RequestBody RefreshTokenInputDTO input
    ){
        var refreshAuthToken = service.refreshToken(input);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(refreshAuthToken);
    }
    @Transactional
    @DeleteMapping("/revoke")
    public ResponseEntity revokeToken(){
        service.revokeToken();
        return ResponseEntity.noContent().build();
    }
}
