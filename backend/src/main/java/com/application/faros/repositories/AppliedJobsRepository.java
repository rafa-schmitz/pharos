package com.application.faros.repositories;

import com.application.faros.model.AppliedJobs;
import com.application.faros.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AppliedJobsRepository extends JpaRepository<AppliedJobs, Long> {
    Boolean existsByUserAppliedJobsIdAndUserId(Long userAppliedJobsId, Long userId);
    Optional<List<AppliedJobs>> findAllByUserId(Long user_id);
    void deleteAllByUserAppliedJobsId(Long userAppliedJobsId);
    void deleteAllByCreatedByJob(Long id);
    void deleteAllByUser(User user);
}
