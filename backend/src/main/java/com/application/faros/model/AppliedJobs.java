package com.application.faros.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppliedJobs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private User user;

    @OneToOne
    private Job userAppliedJobs;
    private Long createdByJob;
    @CreationTimestamp
    @Column(name = "applied_at", updatable = false, unique = true)
    private Timestamp appliedAt;

    public AppliedJobs(User user, Job job) {
        this.user = user;
        userAppliedJobs = job;
        createdByJob = job.getCreatedBy().getId();
    }
}
