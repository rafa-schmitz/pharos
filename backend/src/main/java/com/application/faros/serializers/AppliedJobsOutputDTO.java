package com.application.faros.serializers;

import com.application.faros.model.AppliedJobs;
import com.application.faros.model.Job;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
public class AppliedJobsOutputDTO {
    public AppliedJobsOutputDTO(AppliedJobs appliedJobs) {
        userAppliedJobs = new JobOutputDTO(appliedJobs.getUserAppliedJobs());
        appliedAt = appliedJobs.getAppliedAt();
    }

    private JobOutputDTO userAppliedJobs;
    private Timestamp appliedAt;
}
