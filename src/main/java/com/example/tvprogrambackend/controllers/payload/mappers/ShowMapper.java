package com.example.tvprogrambackend.controllers.payload.mappers;

import com.example.tvprogrambackend.controllers.payload.CreateShow;
import com.example.tvprogrambackend.controllers.payload.CreatedShow;
import com.example.tvprogrambackend.model.Show;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ShowMapper {
    CreatedShow toPayload(Show show);

    List<CreatedShow> toPayload(List<Show> show);

    Show fromPayload(CreateShow shows);

    List<Show> fromPayload(List<CreateShow> shows);
}
