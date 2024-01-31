package com.application.faros.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Embeddable
@Data
@NoArgsConstructor
public class Skills {
    @ElementCollection
    private List<String> tools;
    @ElementCollection
    private List<String> programmingLanguages;

}
