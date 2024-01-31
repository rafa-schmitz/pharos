package com.application.faros.serializers;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TokenOutputDTO {
    private String accessToken;
    private String refreshToken;
}
