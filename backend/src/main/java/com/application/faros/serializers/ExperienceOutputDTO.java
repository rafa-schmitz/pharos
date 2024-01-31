package com.application.faros.serializers;

import com.application.faros.model.Experience;
import com.application.faros.model.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class ExperienceOutputDTO {
    public ExperienceOutputDTO(Experience experience){
        id = experience.getId();
        position = experience.getPosition();
        companyName = experience.getCompanyName();
        startDate = experience.getStartDate();
        endDate = experience.getEndDate();
        createdBy = new UserOutputDTO(experience.getCreatedBy());
    }
    private Long id;
    private String position;
    private String companyName;
    private LocalDate startDate;
    private LocalDate endDate;
    private UserOutputDTO createdBy;
}
