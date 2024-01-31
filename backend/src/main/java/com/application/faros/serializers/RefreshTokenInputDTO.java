package com.application.faros.serializers;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RefreshTokenInputDTO {
    @NotEmpty
    private String refreshToken;
}
