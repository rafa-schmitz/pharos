package com.application.faros.services;

import com.application.faros.model.User;
import com.application.faros.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserContextService {
    private final UserRepository userRepository;
    public User getUserByContext() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        var userAuth = (User) auth.getPrincipal();
        var user = userRepository.findById(userAuth.getId()).orElseThrow();
        return user;
    }
}
