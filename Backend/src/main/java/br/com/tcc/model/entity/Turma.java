package br.com.tcc.model.entity;

import lombok.Data;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.List;

@Entity
public @Data class Turma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String descricao;

    @Column
    private Integer capacidade;

    @Type(type = "yes_no")
    @Column(columnDefinition = "char(1)")
    private Boolean publico;

    @ManyToOne
    private Professor professor;

    @ManyToMany(fetch = FetchType.LAZY)
    private List<Aluno> alunos;

}
