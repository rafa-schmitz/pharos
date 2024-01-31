package com.application.faros.services;

import com.application.faros.infra.errors.ValidateException;
import com.application.faros.model.FileData;
import com.application.faros.model.Job;
import com.application.faros.model.User;
import com.application.faros.repositories.AppliedJobsRepository;
import com.application.faros.repositories.FileDataRepository;
import com.application.faros.repositories.JobRepository;
import com.application.faros.repositories.UserRepository;
import com.application.faros.serializers.JobDTO;
import com.application.faros.serializers.JobOutputDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class JobService {
    private final JobRepository jobRepository;
    private final FileDataRepository fileDataRepository;
    private final UserContextService userContextService;
    private final FilesStorageService storageService;
    private final AppliedJobsRepository appliedJobsRepository;

    public Page<JobOutputDTO> search(
            Pageable pageable,
            String company,
            User createdBy
    ) {
        Job job = new Job();
        job.setCompany(company);
        job.setCreatedBy(createdBy);
        Example<Job> example = Example.of(job);
        return jobRepository.findAll(example,pageable).map(JobOutputDTO::new);
    }
    public Job getJobById(Long id){
        return jobRepository.findById(id).get();
    }
    public JobOutputDTO save(JobDTO jobDTO) {
        Job job = new Job(jobDTO);
        job.setCreatedBy(userContextService.getUserByContext());
        jobRepository.save(job);
        return new JobOutputDTO(job);
    }
    public Job update(
            JobDTO jobDTO,
            Long id
    ){
        Job existJob = jobRepository.findById(id).orElseThrow();
        if(!isValidUser(existJob)) throw new ValidateException("updated failed");
        Job job = new Job(jobDTO);
        job.setId(id);
        job.setCreatedAt(existJob.getCreatedAt());
        return jobRepository.save(job);
    }

    public void delete(Long id) {
        boolean existJob = jobRepository.existsById(id);
        Job job = jobRepository.findById(id).get();
        if(!existJob || !isValidUser(job)) return;
        appliedJobsRepository.deleteAllByUserAppliedJobsId(id);
        jobRepository.deleteById(id);
    }
    public FileData upload(Long id, MultipartFile file) throws Exception  {
        if (jobRepository.existsById(id)) {
            var job = jobRepository.findById(id).orElseThrow();
            if(!isValidUser(job)) throw new Exception();
            if(job.getLogo() == null) {
                var saveFile = storageService.save(file);
                job.setLogo(saveFile);
                jobRepository.save(job);
                return saveFile;
            }
        }
        throw new Exception();
    }
    public FileData updateFile(Long id, MultipartFile file) throws Exception {
        if (jobRepository.existsById(id)) {
            var job = jobRepository.findById(id).orElseThrow();
            var existsImage = fileDataRepository.existsById(job.getLogo().getId());
            if(!isValidUser(job)) throw new Exception();
            if(existsImage){
                var image = fileDataRepository.findById(job.getLogo().getId());
                storageService.delete(image.get().getFilename());
                var saveFile = storageService.update(job.getLogo().getId(),file);
                job.setLogo(saveFile);
                jobRepository.save(job);
                return saveFile;
            }
        }
        throw new Exception();
    }
    private boolean isValidUser(Job job){
        return job.getCreatedBy().getId().equals(userContextService.getUserByContext().getId());
    }
}
