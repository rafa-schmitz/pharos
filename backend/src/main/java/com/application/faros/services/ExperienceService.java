package com.application.faros.services;

import com.application.faros.infra.errors.ValidateException;
import com.application.faros.model.Experience;
import com.application.faros.model.Job;
import com.application.faros.model.User;
import com.application.faros.repositories.ExperienceRepository;
import com.application.faros.repositories.UserRepository;
import com.application.faros.serializers.ExperienceDTO;
import com.application.faros.serializers.ExperienceOutputDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class ExperienceService {
    private final ExperienceRepository experienceRepository;
    private final UserContextService userContextService;
    public ExperienceOutputDTO save(ExperienceDTO experienceDTO) {
        var experience = new Experience(experienceDTO);
        experience.setCreatedBy(userContextService.getUserByContext());
        experienceRepository.save(experience);
        return new ExperienceOutputDTO(experience);
    }

    public Experience update(
            ExperienceDTO experienceDTO,
            Long id
    ) {
        Experience experience = experienceRepository.findById(id).orElseThrow();
        if (!isValidUser(experience)) throw new ValidateException("updated failed");
        Experience upatedExperience = new Experience(experienceDTO);
        upatedExperience.setId(experience.getId());
        experienceRepository.save(upatedExperience);
        return upatedExperience;
    }

    public void delete(Long id) {
        Boolean existExperience = experienceRepository.existsById(id);
        Experience experience = experienceRepository.findById(id).orElseThrow();
        if (!existExperience || !isValidUser(experience)) return;
        experienceRepository.deleteById(id);
    }

    private boolean isValidUser(Experience experience) {
        boolean isValidUser =
                experience.getCreatedBy().getId().equals(userContextService.getUserByContext().getId());
        return isValidUser;
    }

}


