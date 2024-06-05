package com.example.tvprogrambackend.services.impl;


import com.example.tvprogrambackend.controllers.payload.CreateProgram;
import com.example.tvprogrambackend.controllers.payload.mappers.ProgramMapper;
import com.example.tvprogrambackend.controllers.payload.mappers.ShowMapper;
import com.example.tvprogrambackend.model.Channel;
import com.example.tvprogrambackend.model.Program;
import com.example.tvprogrambackend.repositories.ChannelRepository;
import com.example.tvprogrambackend.repositories.ProgramRepository;
import com.example.tvprogrambackend.services.ChannelService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChannelServiceImpl implements ChannelService {
    private final ChannelRepository channelRepository;
    private final ProgramMapper programMapper;
    private final ShowMapper showMapper;
    private final ProgramRepository programRepository;

    @Override
    public List<Channel> findAll() {
        return channelRepository.findAll();
    }

    @Override
    public Channel findById(Long id) {
        return channelRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No channel found"));
    }

    @Override
    public Channel saveChannel(String name) {
        Channel channel = new Channel();
        channel.setName(name);
        return channelRepository.save(channel);
    }

    @Override
    public Channel updateChannelName(Long id, String name) {
        Channel channel = findById(id);
        channel.setName(name);
        return channelRepository.save(channel);
    }

    @Override
    public Channel updateChannelPrograms(Long id, List<CreateProgram> programs) {
        Channel channel = findById(id);
        channel.getPrograms().clear();
        channelRepository.save(channel);
        channel.setPrograms(programs.stream()
                .map(programMapper::fromPayload)
                .collect(Collectors.toList()));
        return channelRepository.save(channel);
    }

    @Override
    public void deleteById(Long id) {
        channelRepository.deleteById(id);
    }
}

