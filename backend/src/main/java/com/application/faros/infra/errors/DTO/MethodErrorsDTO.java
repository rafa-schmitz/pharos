package com.application.faros.infra.errors.DTO;

import lombok.Data;
import org.springframework.validation.FieldError;

@Data
public class MethodErrorsDTO {
    public MethodErrorsDTO(FieldError errors){
        this.field = errors.getField();
        this.message = errors.getDefaultMessage();
    }
    private String field;
    private String message;
}
