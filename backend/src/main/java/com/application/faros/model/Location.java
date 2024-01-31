package com.application.faros.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Embeddable
@Data
@NoArgsConstructor
public class Location {
    private String country;
    private String state;
    private String city;
}
