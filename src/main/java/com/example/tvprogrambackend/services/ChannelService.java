package com.example.tvprogrambackend.services;


import com.example.tvprogrambackend.controllers.payload.CreateProgram;
import com.example.tvprogrambackend.model.Channel;

import java.util.List;

public interface ChannelService {
    List<Channel> findAll();
    Channel findById(Long id);

    Channel saveChannel(String name);

    Channel updateChannelName(Long id, String name);

    Channel updateChannelPrograms(Long id, List<CreateProgram> programs);

    void deleteById(Long id);
}
