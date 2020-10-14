package br.com.tcc.model.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
public @Data
class Turma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Professor professor;

    @ManyToMany
    private List<Aluno> alunos;

    @OneToMany
    private List<Bloco> blocos;

}
