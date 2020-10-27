package net.ddns.tccapp.model.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
public @Data
class Bloco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @NotBlank
    private String titulo;

    @Column
    @NotBlank
    @NotNull
    private String conteudo;

    @JoinColumn(name = "PROFESSOR_ID")
    @ManyToOne
    @NotNull
    private Professor professorCriador;


}
