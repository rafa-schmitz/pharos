package com.application.faros.services;

import com.application.faros.infra.errors.ValidateException;
import com.application.faros.model.AppliedJobs;
import com.application.faros.model.User;
import com.application.faros.repositories.AppliedJobsRepository;
import com.application.faros.repositories.JobRepository;
import com.application.faros.repositories.UserRepository;
import com.application.faros.serializers.AppliedJobsOutputDTO;
import com.application.faros.serializers.JobOutputDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class AppliedJobsService {
    private final AppliedJobsRepository appliedJobsRepository;
    private final UserContextService userContextService;
    private final JobService jobService;

    public AppliedJobsOutputDTO saveAppliedJob(Long jobId) {
        var user = userContextService.getUserByContext();
        Boolean existAppliedJob = appliedJobsRepository.existsByUserAppliedJobsIdAndUserId(jobId, user.getId());
        if(existAppliedJob) throw new ValidateException("Job already applied");
        var job = jobService.getJobById(jobId);
        var appliedJob = new AppliedJobs(user, job);
        var saveJob = appliedJobsRepository.save(appliedJob);

        return new AppliedJobsOutputDTO(saveJob);
    }

    public Stream<AppliedJobsOutputDTO> getAllJobsByUserId() {
        var user = userContextService.getUserByContext();
        var appliedJobs = appliedJobsRepository.findAllByUserId(user.getId()).orElseThrow();

        return appliedJobs.stream().map(AppliedJobsOutputDTO::new);
    }

    public Boolean existAppliedJob(Long jobId){
        var user = userContextService.getUserByContext();
        Boolean existAppliedJob = appliedJobsRepository.existsByUserAppliedJobsIdAndUserId(jobId, user.getId());
        return existAppliedJob;
    }
}
