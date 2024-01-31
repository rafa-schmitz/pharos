package com.application.faros.repositories;

import com.application.faros.model.FileData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FileDataRepository extends JpaRepository<FileData, Long> {
  Optional<FileData> findByFilename(String filename);
  boolean existsByFilename(String filename);
}
