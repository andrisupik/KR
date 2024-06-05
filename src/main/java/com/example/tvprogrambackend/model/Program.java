package com.example.tvprogrambackend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "PROGRAMS")
public class Program {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @OneToMany(mappedBy = "program", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Show> shows = new ArrayList<>();

    @Column(name = "day", nullable = false)
    private Long day;

    @ManyToOne(optional = false)
    @JoinColumn(name = "channel_id", nullable = false)
    private Channel channel;

    public void setShows(List<Show> shows) {
        this.shows.clear();
        this.shows.addAll(shows);
        this.shows.forEach(show -> show.setProgram(this));
    }
}
