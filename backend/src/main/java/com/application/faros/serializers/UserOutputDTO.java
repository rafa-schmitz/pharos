package com.application.faros.serializers;

import com.application.faros.model.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
public class UserOutputDTO {
    public UserOutputDTO(User user) {
        id = user.getId();
        name = user.getName();
        lastName = user.getLastName();
        email = user.getEmail();
        username = user.getUsername();
        languages = user.getLanguages();
        educations = user.getEducations();
        skills = user.getSkills();
        seniority = user.getSeniority();
        role = user.getRole();
        photo = user.getPhoto();
        usertype = user.getUsertype();
        experience = user.getExperience();
    }

    private Long id;
    private String name;
    private String lastName;
    private String email;
    private String username;
    private List<String> languages;
    private List<String> educations;
    private Skills skills;
    private String seniority;
    private String role;
    private FileData photo;
    private UserType usertype;
    private List<Experience> experience;
}
