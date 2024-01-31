package com.application.faros.controller;
import com.application.faros.infra.errors.ValidateException;
import com.application.faros.serializers.UserDTO;
import com.application.faros.serializers.UserOutputDTO;
import com.application.faros.serializers.UserUpdateDTO;
import com.application.faros.serializers.UserUpdatePasswordDTO;
import com.application.faros.services.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
public class UserController {
    private UserService service;

    public UserController(UserService service) {this.service = service;}
    @GetMapping
    public ResponseEntity<Page<UserOutputDTO>> search(
            Pageable pageable,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String lastName
    ) {
        var users = service.search(pageable,name,lastName);
        return ResponseEntity.ok(users);
    }
    @GetMapping("/{id}")
    public ResponseEntity<UserOutputDTO> getUserById(@PathVariable Long id){
        var user = service.getUserById(id);
        return ResponseEntity.ok(user);
    }
    @GetMapping("/myself")
    public ResponseEntity<UserOutputDTO> myself(){
        var user = service.myself();
        return ResponseEntity.ok(user);
    }
    @Transactional
    @PostMapping("/create")
    public ResponseEntity<UserOutputDTO> save(@Valid @RequestBody UserDTO userDTO) {
        var user = service.save(userDTO);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(user);
    }
    @Transactional
    @PutMapping("/update")
    public ResponseEntity<UserOutputDTO> update(
            @Valid @RequestBody UserUpdateDTO userUpdateDTO
    ){
        var updatedUser = service.update(userUpdateDTO);
        return ResponseEntity.ok(updatedUser);
    }
    @Transactional
    @PutMapping("/update/password")
    public ResponseEntity<String> updatePassword(
            @Valid @RequestBody UserUpdatePasswordDTO userUpdatePasswordDTO
    ) throws ValidateException {
        var updatedUser = service.updatePassword(userUpdatePasswordDTO);
        return ResponseEntity.ok(updatedUser);
    }
    @Transactional
    @DeleteMapping("/delete")
    public ResponseEntity delete() {
        service.delete();
        return ResponseEntity.noContent().build();
    }
}

