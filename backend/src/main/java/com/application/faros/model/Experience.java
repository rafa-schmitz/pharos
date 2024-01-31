package com.application.faros.model;

import com.application.faros.serializers.ExperienceDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
public class Experience {
    public Experience(ExperienceDTO experienceDTO){
        position = experienceDTO.getPosition();
        companyName = experienceDTO.getCompanyName();
        startDate = experienceDTO.getStartDate();
        endDate = experienceDTO.getEndDate();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String position;
    private String companyName;
    private LocalDate startDate;
    private LocalDate endDate;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    private User createdBy;
}
