package com.example.tvprogrambackend.controllers.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChannelProgramsDto {
    private List<CreateProgram> programs;
}
