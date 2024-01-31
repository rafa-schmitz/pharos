package com.application.faros.serializers;

import com.application.faros.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdatePasswordDTO {
  @NotEmpty(message = "should not be empty")
  @Size(min = 6, message = "password must be at least 6 characters")
  private String oldPassword;
  @NotEmpty(message = "should not be empty")
  @Size(min = 6, message = "password must be at least 6 characters")
  private String newPassword;
}
