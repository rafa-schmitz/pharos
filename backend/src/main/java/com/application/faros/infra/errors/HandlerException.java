package com.application.faros.infra.errors;


import com.application.faros.infra.errors.DTO.MethodArgumentNotValidDTO;
import com.application.faros.infra.errors.DTO.ValidateDTO;
import com.auth0.jwt.exceptions.IncorrectClaimException;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


import javax.persistence.EntityNotFoundException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Date;
import java.util.NoSuchElementException;

@RestControllerAdvice
public class HandlerException {
    @ExceptionHandler({ EntityNotFoundException.class, NoSuchElementException.class })
    public ResponseEntity ResourceNotFoundException(
            Exception ex
    ){
        ValidateDTO validateDTO = new ValidateDTO(
                new Date(),
                HttpStatus.NOT_FOUND.value(),
                ex.getMessage()
        );
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(validateDTO);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity ResourceBadRequestException(
            MethodArgumentNotValidException ex
    ){
        MethodArgumentNotValidDTO errorDTO = new MethodArgumentNotValidDTO(
                new Date(),
                HttpStatus.BAD_REQUEST.value(),
                ex.getFieldErrors()
        );
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(errorDTO);
    }
    @ExceptionHandler(ValidateException.class)
    public ResponseEntity ResourceValidateException(
            ValidateException ex
    ) {
        ValidateDTO validateDTO = new ValidateDTO(
                new Date(),
                HttpStatus.BAD_REQUEST.value(),
                ex.getMessage()
        );
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(validateDTO);
    }
    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public ResponseEntity ResourceSQLIntegrityConstraintViolationException(
            SQLIntegrityConstraintViolationException ex
    ){
        ValidateDTO validateDTO = new ValidateDTO(
                new Date(),
                HttpStatus.BAD_REQUEST.value(),
                "R10"
        );
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(validateDTO);
    }
    @ExceptionHandler({
            JWTVerificationException.class,
            JWTDecodeException.class,
            IncorrectClaimException.class
    })
    public ResponseEntity ResourceJWTVerificationException(
            Exception ex
    ){
        ValidateDTO validateDTO = new ValidateDTO(
                new Date(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                ex.getMessage()
        );
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(validateDTO);
    }
    @ExceptionHandler({TokenExpiredException.class})
    public ResponseEntity ResourceUnauthorizedException(
            Exception ex
    ){
       return ResponseEntity
               .status(HttpStatus.UNAUTHORIZED)
               .build();
    }
}
