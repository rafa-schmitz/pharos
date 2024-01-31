package com.application.faros.controller;
import com.application.faros.model.Job;
import com.application.faros.model.User;
import com.application.faros.serializers.JobDTO;
import com.application.faros.serializers.JobOutputDTO;
import com.application.faros.services.JobService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;

@RestController
@RequestMapping("/jobs")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
public class JobController {
    private JobService service;

    public JobController(JobService service) {
        this.service = service;
    }
    @GetMapping
    public ResponseEntity<Page<JobOutputDTO>> search(
            Pageable pageable,
            @RequestParam(required = false) String company,
            @RequestParam(required = false) User createdBy
            ) {
        var jobs = service.search(pageable,company,createdBy);
        return ResponseEntity.ok(jobs);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id){
       var job = service.getJobById(id);
       return ResponseEntity.ok(job);
    }

    @Transactional
    @PostMapping("/create")
    public ResponseEntity<JobOutputDTO> save(@Valid @RequestBody JobDTO jobDTO) {
        var saveJob = service.save(jobDTO);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saveJob);
    }
    @Transactional
    @PutMapping("/{id}/update")
    public ResponseEntity<Job> update(
           @Valid @RequestBody JobDTO jobDTO,
           @PathVariable Long id
    ) throws Exception {
      var updateJob = service.update(jobDTO,id);
      return ResponseEntity.ok(updateJob);
    }
    @Transactional
    @DeleteMapping("/{id}/delete")
    public ResponseEntity delete(@PathVariable Long id) {
       service.delete(id);
       return ResponseEntity.noContent().build();
    }
}
