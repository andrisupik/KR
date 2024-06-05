package com.example.tvprogrambackend.services.impl;


import com.example.tvprogrambackend.controllers.payload.CreateProgram;
import com.example.tvprogrambackend.model.Program;
import com.example.tvprogrambackend.repositories.ProgramRepository;
import com.example.tvprogrambackend.services.ChannelService;
import com.example.tvprogrambackend.services.ProgramService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProgramServiceImpl implements ProgramService {
    private final ProgramRepository programRepository;
    private final ChannelService channelService;

    @Override
    public List<Program> findAll() {
        return programRepository.findAll();
    }

    @Override
    public Program findById(Long id) {
        return programRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No program found"));
    }

    @Override
    public Program saveProgram(CreateProgram program) {
        Program newProgram = new Program();
        newProgram.setChannel(channelService.findById(program.getChannelId()));
        newProgram.setDay(program.getDay());
        return programRepository.save(newProgram);
    }

    @Override
    public void deleteById(Long id) {
        programRepository.deleteById(id);
    }
}

