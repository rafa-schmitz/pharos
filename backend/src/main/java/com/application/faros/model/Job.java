package com.application.faros.model;

import com.application.faros.serializers.JobDTO;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Job {
    public Job(JobDTO jobDTO){
        company = jobDTO.getCompany();
        logo = jobDTO.getLogo();
        role = jobDTO.getRole();
        position = jobDTO.getPosition();
        seniority = jobDTO.getSeniority();
        contractType = jobDTO.getContractType();
        location = jobDTO.getLocation();
        requirements = jobDTO.getRequirements();
        description = jobDTO.getDescription();
        salaryCap = jobDTO.getSalaryCap();
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String company;
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;
    private String role;
    private String position;
    private String seniority;
    private String contractType;
    @Embedded
    private Location location;
    @ElementCollection
    private List<String> requirements;
    @Column(length = 6000)
    private String description;
    private Float salaryCap;
    @OneToOne
    private FileData logo;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    private User createdBy;
}
