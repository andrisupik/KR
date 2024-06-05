package com.example.tvprogrambackend.controllers.payload.mappers;

import com.example.tvprogrambackend.controllers.payload.CreateProgram;
import com.example.tvprogrambackend.controllers.payload.CreatedProgram;
import com.example.tvprogrambackend.model.Program;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = ShowMapper.class)
public interface ProgramMapper {
    CreatedProgram toPayload(Program program);

    List<CreatedProgram> toPayload(List<Program> programs);

    Program fromPayload(CreateProgram programs);

    List<Program> fromPayload(List<CreateProgram> programs);
}
