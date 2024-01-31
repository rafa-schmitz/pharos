package com.application.faros.controller;

import com.application.faros.model.Experience;
import com.application.faros.serializers.*;
import com.application.faros.services.ExperienceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.transaction.Transactional;
import javax.validation.Valid;

@RestController
@RequestMapping("/experience")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@RequiredArgsConstructor
public class ExperienceController {
    private final ExperienceService service;

    @Transactional
    @PostMapping("/create")
    public ResponseEntity<ExperienceOutputDTO> save(@Valid @RequestBody ExperienceDTO experienceDTO) {
        var newExperience = service.save(experienceDTO);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(newExperience);
    }
    @Transactional
    @PutMapping("/{id}/update")
    public ResponseEntity<Experience> update(
            @Valid @RequestBody ExperienceDTO ExperienceDTO,
            @PathVariable Long id
    ){
        var updatedUser = service.update(ExperienceDTO,id);
        return ResponseEntity.ok(updatedUser);
    }
    @Transactional
    @DeleteMapping("/{id}/delete")
    public ResponseEntity delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}


