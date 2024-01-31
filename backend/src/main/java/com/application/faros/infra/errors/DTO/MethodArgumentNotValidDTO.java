package com.application.faros.infra.errors.DTO;
import lombok.Data;
import org.springframework.validation.FieldError;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Data
public class MethodArgumentNotValidDTO {
    public MethodArgumentNotValidDTO(Date timestamp, Integer statusCode, List<FieldError> errors) {
        this.timestamp = timestamp;
        this.statusCode = statusCode;
        List<MethodErrorsDTO> list = new ArrayList<>();
        for (FieldError error : errors) {
            MethodErrorsDTO methodArgumentNotValidDTO = new MethodErrorsDTO(error);
            list.add(methodArgumentNotValidDTO);
        }
        this.errors = list;
    }
    private Date timestamp;
    private Integer statusCode;
    private List<MethodErrorsDTO> errors;
}
