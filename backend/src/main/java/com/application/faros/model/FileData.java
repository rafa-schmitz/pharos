package com.application.faros.model;

import com.application.faros.serializers.FileDataDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
public class FileData {
  public FileData(FileDataDTO fileDataDTO){
    filename = fileDataDTO.getFilename();
    url = fileDataDTO.getUrl();
  }
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String filename;
  private String url;
}
