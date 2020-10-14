package br.com.tcc.model.entity;

import lombok.Data;
import org.hibernate.validator.constraints.br.CPF;

import javax.persistence.*;
import java.util.List;

@Entity
public @Data class Professor extends Usuario {

    @Column(length = 12)
    @CPF
    private String cpf;

    @OneToMany(mappedBy = "professor")
    private List<Turma> turmas;

    @OneToMany(mappedBy = "professorCriador")
    private List<Bloco> blocosCriados;
}
