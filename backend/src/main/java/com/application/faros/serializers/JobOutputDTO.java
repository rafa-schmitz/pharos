package com.application.faros.serializers;

import com.application.faros.model.FileData;
import com.application.faros.model.Job;
import com.application.faros.model.Location;
import com.application.faros.model.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@NoArgsConstructor
public class JobOutputDTO {
  public JobOutputDTO(Job job){
    id = job.getId();
    company = job.getCompany();
    createdAt = job.getCreatedAt();
    updatedAt = job.getUpdatedAt();
    logo = job.getLogo();
    role = job.getRole();
    position = job.getPosition();
    seniority = job.getSeniority();
    contractType = job.getContractType();
    location = job.getLocation();
    requirements = job.getRequirements();
    description = job.getDescription();
    salaryCap = job.getSalaryCap();
    createdBy = new UserOutputDTO(job.getCreatedBy());
  }
  private Long id;
  private String company;
  private Timestamp createdAt;
  private Timestamp updatedAt;
  private FileData logo;
  private String role;
  private String position;
  private String seniority;
  private String contractType;
  private Location location;
  private List<String> requirements;
  private String description;
  private Float salaryCap;
  private UserOutputDTO createdBy;
}
