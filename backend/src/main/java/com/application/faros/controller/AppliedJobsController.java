package com.application.faros.controller;

import com.application.faros.model.AppliedJobs;
import com.application.faros.model.Job;
import com.application.faros.serializers.AppliedJobsOutputDTO;
import com.application.faros.services.AppliedJobsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.stream.Stream;

@RestController
@RequiredArgsConstructor
@RequestMapping("/applied-jobs")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
public class AppliedJobsController {
    private final AppliedJobsService appliedJobsService;

    @PostMapping("/job/{jobId}")
    public ResponseEntity<AppliedJobsOutputDTO> saveAppliedJob(@PathVariable Long jobId) {
        var appliedJob = appliedJobsService.saveAppliedJob(jobId);

        return ResponseEntity.status(201).body(appliedJob);
    }
    @GetMapping
    public ResponseEntity<Stream<AppliedJobsOutputDTO>> getAppliedJobs() {
        var getAppliedJobs = appliedJobsService.getAllJobsByUserId();

        return ResponseEntity.status(200).body(getAppliedJobs);
    }
    @GetMapping("/exist/job/{jobId}")
    public ResponseEntity<Boolean> existAppliedJob(@PathVariable Long jobId) {
        var existAppliedJob = appliedJobsService.existAppliedJob(jobId);

        return ResponseEntity.status(200).body(existAppliedJob);
    }
}
