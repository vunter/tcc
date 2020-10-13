package br.com.tcc.model.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
public @Data class Aluno extends Usuario{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String matricula;

    @ManyToMany(mappedBy = "alunos")
    private List<Turma> turmas;

}
