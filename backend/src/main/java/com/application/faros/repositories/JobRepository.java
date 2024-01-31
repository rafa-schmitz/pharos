package com.application.faros.repositories;

import com.application.faros.model.Job;
import com.application.faros.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
    Page<Job> findAllByCompany (Pageable page, String company);
    void deleteAllByCreatedBy(User user);
}
