package com.application.faros.infra.security;

import com.application.faros.infra.errors.UnauthorizedException;
import com.application.faros.repositories.AuthTokenRepository;
import com.application.faros.repositories.UserRepository;
import com.application.faros.services.TokenService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.NoSuchElementException;

@Component
public class SecurityFilter extends OncePerRequestFilter {
    private TokenService tokenService;
    private UserRepository userRepository;
    private AuthTokenRepository authTokenRepository;
    @Qualifier("handlerExceptionResolver")
    private HandlerExceptionResolver handlerExceptionResolver;


    public SecurityFilter(
            TokenService tokenService,
            UserRepository userRepository,
            HandlerExceptionResolver handlerExceptionResolver,
            AuthTokenRepository authTokenRepository
    ){
        this.tokenService = tokenService;
        this.userRepository = userRepository;
        this.handlerExceptionResolver = handlerExceptionResolver;
        this.authTokenRepository = authTokenRepository;
    }


    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        try{
            var token = recoveryToken(request);
            if(token != null){
                authTokenRepository.findByAccessToken(token).orElseThrow();
                var subject = tokenService.getSubject(token);
                var user = userRepository.findById(Long.parseLong(subject)).orElseThrow();
                var authentication = new UsernamePasswordAuthenticationToken(
                        user,
                        null,
                        user.getAuthorities()
                );
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            filterChain.doFilter(request,response);
        }
        catch (NoSuchElementException ex){
            var exception =  new UnauthorizedException();
            handlerExceptionResolver.resolveException(request,response,null,exception);
        }
        catch (Exception ex){
            handlerExceptionResolver.resolveException(request,response,null,ex);
        }
    }
    private String recoveryToken(HttpServletRequest request){
        var authorizationHeader = request.getHeader("Authorization");
        if(authorizationHeader != null){
            return authorizationHeader.replace("Bearer ","");
        }
        return null;
    }
}
