package com.application.faros.infra.errors.DTO;

import lombok.Data;

import java.util.Date;

@Data
public class ValidateDTO {
    public ValidateDTO(Date timestamp, Integer statusCode, String message) {
        this.timestamp = timestamp;
        this.statusCode = statusCode;
        this.message = message;
    }
    private Date timestamp;
    private Integer statusCode;
    private String message;
}
