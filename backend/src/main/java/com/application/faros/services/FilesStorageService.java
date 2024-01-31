package com.application.faros.services;

import com.application.faros.model.FileData;
import com.application.faros.serializers.FileDataDTO;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.stream.Stream;

public interface FilesStorageService {
    void init();

    FileData save(MultipartFile file);

    FileData update(Long id, MultipartFile file);

    Resource load(String filename);

    void delete(String filename);

    ResponseEntity<byte[]> getFile(String filename) throws IOException;
}
