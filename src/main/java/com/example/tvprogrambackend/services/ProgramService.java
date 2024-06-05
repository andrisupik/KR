package com.example.tvprogrambackend.services;

import com.example.tvprogrambackend.controllers.payload.CreateProgram;
import com.example.tvprogrambackend.model.Program;

import java.util.List;

public interface ProgramService {
    List<Program> findAll();
    Program findById(Long id);

    Program saveProgram(CreateProgram program);

    void deleteById(Long id);
}
