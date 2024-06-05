package com.example.tvprogrambackend.controllers.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreatedProgram {
    private Long id;
    private Long day;
    private List<CreatedShow> shows;
}
