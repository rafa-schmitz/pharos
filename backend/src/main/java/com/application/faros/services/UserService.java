package com.application.faros.services;

import com.application.faros.infra.errors.ValidateException;
import com.application.faros.model.FileData;
import com.application.faros.model.User;
import com.application.faros.model.UserType;
import com.application.faros.repositories.*;
import com.application.faros.serializers.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;


@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final FileDataRepository fileDataRepository;
    private final FilesStorageService storageService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserContextService userContextService;
    private final AuthTokenRepository authTokenRepository;
    private final JobRepository jobRepository;
    private final AppliedJobsRepository appliedJobsRepository;

    public Page<UserOutputDTO> search(
            Pageable pageable,
            String name,
            String lastName
    ) {
        User user = new User();
        user.setName(name);
        user.setLastName(lastName);
        Example<User> example = Example.of(user);

        Page<UserOutputDTO> users = userRepository.findAll(example, pageable).map(UserOutputDTO::new);
        return users;
    }

    public UserOutputDTO getUserById(Long id) {
        User user = userRepository.findById(id).get();
        return new UserOutputDTO(user);
    }

    public UserOutputDTO myself() {
        var user = userContextService.getUserByContext();
        return new UserOutputDTO(user);
    }

    public UserOutputDTO save(UserDTO userDTO) {
        User user = new User(userDTO);
        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        userRepository.save(user);

        return new UserOutputDTO(user);
    }

    public UserOutputDTO update(
            UserUpdateDTO UserUpdateDTO
    ) {
        User user = userContextService.getUserByContext();
        User updatedUser = updateUser(user, UserUpdateDTO);
        updatedUser.setId(user.getId());
        userRepository.save(updatedUser);
        return new UserOutputDTO(updatedUser);
    }

    private User updateUser(User user, UserUpdateDTO userUpdateDTO) {
        user.setName(userUpdateDTO.getName());
        user.setEmail(userUpdateDTO.getEmail());
        user.setLanguages(userUpdateDTO.getLanguages());
        user.setLastName(userUpdateDTO.getLastName());
        user.setRole(userUpdateDTO.getRole());
        user.setEducations(userUpdateDTO.getEducations());
        user.setSeniority(userUpdateDTO.getSeniority());
        user.setSkills(userUpdateDTO.getSkills());

        return user;
    }

    public String updatePassword(
            UserUpdatePasswordDTO userUpdatePasswordDTO
    ) throws ValidateException {
        var user = userContextService.getUserByContext();
        Boolean verifyPassword = bCryptPasswordEncoder.matches(userUpdatePasswordDTO.getOldPassword(), user.getPassword());
        if (verifyPassword) {
            String encodedPassword = bCryptPasswordEncoder.encode(userUpdatePasswordDTO.getNewPassword());
            user.setPassword(encodedPassword);
            userRepository.save(user);
            return "successfully updated password";
        }
        throw new ValidateException("failed updated password");
    }

    public void delete() {
        var user = userContextService.getUserByContext();
        Boolean existUser = userRepository.existsById(user.getId());
        if (!existUser) return;
        removeChildrenRegister(user);
        userRepository.deleteById(user.getId());
    }

    private void removeChildrenRegister(User user){
        var isRecruiter = user.getUsertype().equals(UserType.ROLE_RECRUITER);
        authTokenRepository.deleteByUser(user);
        if(isRecruiter){
            appliedJobsRepository.deleteAllByCreatedByJob(user.getId());
            jobRepository.deleteAllByCreatedBy(user);
            return;
        }
        appliedJobsRepository.deleteAllByUser(user);
    }

    public FileData upload(MultipartFile file) throws Exception {
        var user = userContextService.getUserByContext();
        if (user.getPhoto() == null) {
            var saveFile = storageService.save(file);
            user.setPhoto(saveFile);
            userRepository.save(user);
            return saveFile;
        }

        throw new Exception();
    }

    public FileData updateFile(MultipartFile file) throws Exception {
        var user = userContextService.getUserByContext();
        var existsImage = fileDataRepository.existsById(user.getPhoto().getId());
        if (existsImage) {
            var image = fileDataRepository.findById(user.getPhoto().getId());
            storageService.delete(image.get().getFilename());
            var saveFile = storageService.update(user.getPhoto().getId(), file);
            user.setPhoto(saveFile);
            userRepository.save(user);
            return saveFile;
        }

        throw new Exception();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username);
    }
}
