package com.application.faros.controller;

import com.application.faros.model.FileData;
import com.application.faros.services.FilesStorageService;
import com.application.faros.services.JobService;
import com.application.faros.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.IIOException;
import javax.transaction.Transactional;
import java.io.IOException;

@RestController
@RequestMapping
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
public class StorageController {
  private UserService userService;
  private JobService jobService;
  private FilesStorageService service;
  public StorageController(FilesStorageService service, UserService userService, JobService jobService){
    this.service = service;
    this.userService = userService;
    this.jobService = jobService;
  }
  @PostMapping("/jobs/{jobId}/files")
  @Transactional
  public ResponseEntity<?> uploadJobFile(@PathVariable Long jobId , @RequestParam MultipartFile file) {
    String message = "";
    try {
      FileData fileData = jobService.upload(jobId,file);
      return ResponseEntity.ok(fileData);
    } catch (Exception e) {
      message =
              "Could not upload the file: " +
                      file.getOriginalFilename() +
                      ". Error: " +
                      e.getMessage();
      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
    }
  }
  @PostMapping("/users/files")
  @Transactional
  public ResponseEntity<?> uploadUserFile(@RequestParam MultipartFile file) {
    String message = "";
    try {
     FileData fileData = userService.upload(file);
      return ResponseEntity.ok(fileData);
    } catch (Exception e) {
      message =
              "Could not upload the file: " +
                      file.getOriginalFilename() +
                      ". Error: " +
                      e.getMessage();
      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
    }
  }
  @PutMapping("/jobs/{jobId}/files/update")
  @Transactional
  public ResponseEntity<?> updateJobFile(@PathVariable Long jobId , @RequestParam MultipartFile file) {
    String message = "";
    try {
      FileData fileData = jobService.updateFile(jobId,file);
      return ResponseEntity.ok(fileData);
    } catch (Exception e) {
      message =
              "Could not upload the file: " +
                      file.getOriginalFilename() +
                      ". Error: " +
                      e.getMessage();
      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
    }
  }
  @PutMapping("/users/files/update")
  @Transactional
  public ResponseEntity<?> updateUserFile(@RequestParam MultipartFile file) {
    String message = "";
    try {
     FileData fileData =  userService.updateFile(file);
      return ResponseEntity.ok(fileData);
    } catch (Exception e) {
      message =
              "Could not upload the file: " +
                      file.getOriginalFilename() +
                      ". Error: " +
                      e.getMessage();
      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
    }
  }
  @GetMapping("/files/{filename}")
  public ResponseEntity<?> getFile(@PathVariable String filename) throws IOException {
    var file = service.getFile(filename);
    return file;
  }
}
