package com.example.tvprogrambackend.controllers;

import com.example.tvprogrambackend.controllers.payload.ChannelNameDto;
import com.example.tvprogrambackend.controllers.payload.ChannelProgramsDto;
import com.example.tvprogrambackend.controllers.payload.CreateProgram;
import com.example.tvprogrambackend.controllers.payload.CreatedChannel;
import com.example.tvprogrambackend.controllers.payload.mappers.ChannelMapper;
import com.example.tvprogrambackend.services.ChannelService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/api/channels")
public class ChannelController {
    private final ChannelService channelService;
    private final ChannelMapper channelMapper;

    @GetMapping
    public List<CreatedChannel> findAll() {
        return channelMapper.toPayload(channelService.findAll());
    }

    @GetMapping("/{id}")
    public CreatedChannel findById(@PathVariable Long id) {
        return channelMapper.toPayload(channelService.findById(id));
    }

    @PostMapping
    public CreatedChannel saveChannel(@RequestBody String name) {
        return channelMapper.toPayload(channelService.saveChannel(name));
    }

    @PutMapping("/{id}")
    public CreatedChannel updateChannelName(@RequestBody ChannelNameDto body, @PathVariable Long id) {
        return channelMapper.toPayload(channelService.updateChannelName(id, body.getName()));
    }

    @PutMapping("/{id}/programs")
    public CreatedChannel updateChannelPrograms(@RequestBody ChannelProgramsDto body, @PathVariable Long id) {
        return channelMapper.toPayload(channelService.updateChannelPrograms(id, body.getPrograms()));
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        channelService.deleteById(id);
    }
}
