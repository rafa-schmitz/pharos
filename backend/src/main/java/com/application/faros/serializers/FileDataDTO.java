package com.application.faros.serializers;

import com.application.faros.model.FileData;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
public class FileDataDTO {
  public FileDataDTO(String filename, String url){
    this.filename = filename;
    this.url = url;
  }
  private String filename;
  private String url;
}
