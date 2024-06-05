package com.example.tvprogrambackend.controllers.payload.mappers;

import com.example.tvprogrambackend.controllers.payload.CreatedChannel;
import com.example.tvprogrambackend.model.Channel;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = ChannelMapper.class)
public interface ChannelMapper {
    CreatedChannel toPayload(Channel channel);

    List<CreatedChannel> toPayload(List<Channel> channels);
}
