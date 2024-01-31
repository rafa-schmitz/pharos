package com.application.faros.serializers;

import com.application.faros.model.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
public class UserUpdateDTO {
    public UserUpdateDTO(User user) {
        name = user.getName();
        lastName = user.getLastName();
        email = user.getEmail();
        languages = user.getLanguages();
        educations = user.getEducations();
        skills = user.getSkills();
        seniority = user.getSeniority();
        role = user.getRole();
    }

    @NotEmpty(message = "should not be empty")
    private String name;
    private String lastName;
    @NotEmpty(message = "should not be empty")
    @Email
    private String email;
    private List<String> languages;
    private List<String> educations;
    private Skills skills;
    private String seniority;
    private String role;
}
