package com.application.faros.services;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.charset.StandardCharsets;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Optional;

import com.application.faros.model.FileData;
import com.application.faros.repositories.FileDataRepository;
import com.application.faros.serializers.FileDataDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Service
@RequiredArgsConstructor
public class FilesStorageServiceImpl implements FilesStorageService {
    private final FileDataRepository fileDataRepository;
    private final Path root = Paths.get("uploads");
    @Override
    public void init() {
        try {
            Files.createDirectories(root);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }
    }

    private Optional<String> getExtension(String filename){
        return Optional.ofNullable(filename)
                .filter(f -> f.contains("."))
                .map(f -> f.substring(filename.lastIndexOf(".") + 1));
    }

    private String getFilename(MultipartFile file) throws NoSuchAlgorithmException{
        String date = LocalDateTime.now().toString();
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(date.getBytes(StandardCharsets.UTF_8));
        String encoded = Base64.getEncoder().encodeToString(hash).replaceAll("[^a-zA-Z0-9]+", "");

        var format = this.getExtension(file.getOriginalFilename());
        if(format.isPresent()){
            return encoded + "." + format.get();
        }else{
            throw new RuntimeException("File format not found!");
        }
    }

    @Override
    public FileData save(MultipartFile file) {
        this.init();
        try {
            final String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
            String filename = this.getFilename(file);
            String url = baseUrl + "/files/" + filename;
            Path destinationPath = this.root.resolve(filename);

            if (Files.exists(destinationPath)) {
                throw new FileAlreadyExistsException("A file of that name already exists.");
            }

            try (InputStream inputStream = file.getInputStream()) {
                copyFile(inputStream, destinationPath);
            }

            FileDataDTO fileDataDTO = new FileDataDTO(filename, url);
            return fileDataRepository.save(new FileData(fileDataDTO));
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public void copyFile(InputStream inputStream, Path destinationPath) {
        try {
            Files.copy(inputStream, destinationPath);
        } catch (IOException e) {
            throw new RuntimeException("Error occurred during file I/O: " + e.getMessage());
        }
    }

    @Override
    public FileData update(Long id, MultipartFile file) {
        try {
            final String baseUrl =
                    ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
            String filename = this.getFilename(file);
            String url = baseUrl+"/files/"+filename;
            Path destinationPath = this.root.resolve(filename);

            if (Files.exists(destinationPath)) {
                throw new FileAlreadyExistsException("A file of that name already exists.");
            }

            try (InputStream inputStream = file.getInputStream()) {
                copyFile(inputStream, destinationPath);
            }

            FileDataDTO fileDataDTO = new FileDataDTO(filename,url);
            FileData fileData = new FileData(fileDataDTO);
            fileData.setId(id);
            fileDataRepository.save(fileData);
            return fileData;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public Resource load(String filename) {
        try {
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }
    @Override
    public void delete(String filename) {
        Path file = root.resolve(filename);
        try {
            FileSystemUtils.deleteRecursively(file);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    @Override
    public ResponseEntity<byte[]> getFile(String filename) throws IOException {
        if (fileDataRepository.existsByFilename(filename)) {
            var fileData = fileDataRepository.findByFilename(filename).get();
                File file =  this.load(fileData.getFilename()).getFile();
                byte[] images = Files.readAllBytes(new File(String.valueOf(file)).toPath());
                return ResponseEntity.ok()
                        .contentType(MediaType.valueOf("image/jpeg"))
                        .body(images);
       }
        throw new IOException();
    }}
