package com.application.faros.serializers;

import com.application.faros.model.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
public class UserDTO {
    public UserDTO(User user) {
        name = user.getName();
        lastName = user.getLastName();
        email = user.getEmail();
        password = user.getPassword();
        username = user.getUsername();
        languages = user.getLanguages();
        educations = user.getEducations();
        skills = user.getSkills();
        seniority = user.getSeniority();
        role = user.getRole();
        photo = user.getPhoto();
        usertype = user.getUsertype();
    }

    @NotEmpty(message = "should not be empty")
    private String name;
    private String lastName;
    @NotEmpty(message = "should not be empty")
    @Email(message = "email is not valid")
    private String email;
    @NotEmpty(message = "should not be empty")
    @Size(min = 6, message = "password must be at least 6 characters")
    private String password;
    @NotEmpty(message = "should not be empty")
    private String username;
    private List<String> languages;
    private List<String> educations;
    private Skills skills;
    private String seniority;
    private String role;
    private FileData photo;
    private UserType usertype;
}
