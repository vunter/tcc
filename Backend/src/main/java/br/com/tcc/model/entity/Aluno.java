package br.com.tcc.model.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
public @Data class Aluno extends Usuario {

    @Column
    @NotBlank
    private String matricula;

    @ManyToMany(mappedBy = "alunos")
    private List<Turma> turmas;

}
