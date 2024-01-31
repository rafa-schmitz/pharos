package com.application.faros.serializers;

import com.application.faros.model.Experience;
import com.application.faros.model.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@NoArgsConstructor
public class ExperienceDTO {
    public ExperienceDTO(Experience experience){
        position = experience.getPosition();
        companyName = experience.getCompanyName();
        startDate = experience.getStartDate();
        endDate = experience.getEndDate();
    }
    @NotEmpty(message = "should not be empty")
    private String position;
    @NotEmpty(message = "should not be empty")
    private String companyName;
    @NotNull(message = "should not be null")
    private LocalDate startDate;
    @NotNull(message = "should not be null")
    private LocalDate endDate;
}
