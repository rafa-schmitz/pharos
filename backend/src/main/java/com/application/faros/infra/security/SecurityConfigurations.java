package com.application.faros.infra.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfigurations {

    private final AuthEntryPoint authEntryPoint;
    private final SecurityFilter securityFilter;

    public SecurityConfigurations(AuthEntryPoint authEntryPoint, SecurityFilter securityFilter) {
        this.authEntryPoint = authEntryPoint;
        this.securityFilter = securityFilter;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){return new BCryptPasswordEncoder();}
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration
    )
            throws Exception{
            return configuration.getAuthenticationManager();
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        return http
                .csrf()
                .disable()
                .cors()
                .and()
                .authorizeHttpRequests(request ->
                        request
                                .antMatchers(HttpMethod.POST,"/login","/users/create","/login/refresh")
                                .permitAll()
                                .antMatchers(HttpMethod.GET,"/files/*", "/jobs","/jobs/*")
                                .permitAll()
                                .antMatchers(HttpMethod.POST,"/jobs/*").hasRole("RECRUITER")
                                .antMatchers(HttpMethod.DELETE, "/jobs/*").hasRole("RECRUITER")
                                .antMatchers(HttpMethod.PUT,"/jobs/*").hasRole("RECRUITER")
                                .antMatchers(HttpMethod.POST, "/applied-jobs/job/*").hasRole("USER")
                                .antMatchers(
                                        "/v3/api-docs/*",
                                        "/v3/*",
                                        "/swagger-ui.html",
                                        "/swagger-ui/*"
                                )
                                .permitAll()
                                .anyRequest()
                                .authenticated()
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling()
                .authenticationEntryPoint(authEntryPoint)
                .and()
                .sessionManagement(management ->
                        management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .build();

    }
}