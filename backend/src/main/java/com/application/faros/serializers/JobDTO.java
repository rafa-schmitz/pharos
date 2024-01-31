package com.application.faros.serializers;

import com.application.faros.model.FileData;
import com.application.faros.model.Job;
import com.application.faros.model.Location;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.File;
import java.util.List;

@Data
@NoArgsConstructor
public class JobDTO {
    public JobDTO(Job job){
        company = job.getCompany();
        logo = job.getLogo();
        role = job.getRole();
        position = job.getPosition();
        seniority = job.getSeniority();
        contractType = job.getContractType();
        location = job.getLocation();
        requirements = job.getRequirements();
        description = job.getDescription();
        salaryCap = job.getSalaryCap();
    }
    @NotEmpty(message = "should not be empty")
    private String company;
    private FileData logo;
    @NotEmpty(message = "should not be empty")
    private String role;
    @NotEmpty(message = "should not be empty")
    private String position;
    @NotEmpty(message = "should not be empty")
    private String seniority;
    @NotEmpty(message = "should not be empty")
    private String contractType;
    @NotNull(message = "should not be null")
    private Location location;
    @NotNull(message = "should not be null")
    private List<String> requirements;
    @NotEmpty(message = "should not be empty")
    private String description;
    @NotNull(message = "should not be null")
    private Float salaryCap;
}
