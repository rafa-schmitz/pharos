package com.application.faros.serializers;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TokenDTO {
    @NotEmpty
    private String username;
    @NotEmpty
    private String password;
}
