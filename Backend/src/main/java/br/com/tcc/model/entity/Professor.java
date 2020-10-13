package br.com.tcc.model.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
public @Data class Professor extends Usuario{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "professor")
    private List<Turma> turmas;

    @OneToMany(mappedBy = "professorCriador")
    private List<Bloco> blocosCriados;
}
