package com.application.faros.repositories;
import com.application.faros.model.User;
import com.application.faros.serializers.UserOutputDTO;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<User, Long> {
    Page<User> findAllByName(Pageable page, String name);
    Page<User> findAllByNameAndLastName(Pageable page, String name, String lastName);
    UserDetails findByUsername(String username);

}
