package br.com.tcc.model.entity;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.sql.Time;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public @Data class Aula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String titulo;

    @Column
    private String objetivo;

    @Column
    @Lob
    private String gabarito;

    @Column
    private Time duracao;

    @ManyToOne
    private Turma turma;

    @OneToMany
    private List<Bloco> blocos;

    @Column
    @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm:SS")
    private LocalDateTime dataAula;

}
