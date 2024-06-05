package com.example.tvprogrambackend.controllers.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateShow {
    private String name;
    private String startTime;
    private String endTime;
}
