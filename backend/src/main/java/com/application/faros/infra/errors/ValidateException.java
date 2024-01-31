package com.application.faros.infra.errors;

public class ValidateException extends RuntimeException{
    public ValidateException(String message){
        super(message);
    }
}
