package br.com.tcc.model.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
public @Data class Bloco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String titulo;

    @Column
    private String conteudo;

    @JoinColumn(name = "PROFESSOR_ID")
    @ManyToOne
    private Professor professorCriador;


}
