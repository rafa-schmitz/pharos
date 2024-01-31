package com.application.faros.model;

import com.application.faros.serializers.UserDTO;
import com.application.faros.serializers.UserUpdateDTO;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    public User(UserDTO userDTO) {
        name = userDTO.getName();
        lastName = userDTO.getLastName();
        email = userDTO.getEmail();
        password = userDTO.getPassword();
        username = userDTO.getUsername();
        languages = userDTO.getLanguages();
        educations = userDTO.getEducations();
        skills = userDTO.getSkills();
        seniority = userDTO.getSeniority();
        role = userDTO.getRole();
        photo = userDTO.getPhoto();
        usertype = userDTO.getUsertype() != null ? userDTO.getUsertype() : UserType.ROLE_USER;
    }
    public User(UserUpdateDTO userUpdateDTO) {
        name = userUpdateDTO.getName();
        lastName = userUpdateDTO.getLastName();
        languages = userUpdateDTO.getLanguages();
        educations = userUpdateDTO.getEducations();
        skills = userUpdateDTO.getSkills();
        seniority = userUpdateDTO.getSeniority();
        role = userUpdateDTO.getRole();
    }

    @Column(nullable = false)
    private String name;
    private String lastName;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false, unique = true)
    private String username;
    @ElementCollection
    private List<String> languages;
    @ElementCollection
    private List<String> educations;
    @Embedded
    private Skills skills;
    private String seniority;
    private String role;
    @OneToOne
    private FileData photo;
    @Column(nullable = false, updatable = false)
    @Enumerated(EnumType.STRING)
    private UserType usertype;
    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL)
    private List<Experience> experience;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(usertype.toString()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
