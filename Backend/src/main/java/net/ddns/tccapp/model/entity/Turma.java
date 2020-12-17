package net.ddns.tccapp.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.List;

@Entity
@EqualsAndHashCode(exclude = {"alunos", "publicacoes", "aulas"})
public @Data
class Turma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String codigo;

    @Column
    private String nome;

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
    @JoinTable(name = "TURMA_ALUNOS", joinColumns = {@JoinColumn(name = "TURMA_ID")},
            inverseJoinColumns = {@JoinColumn(name = "ALUNOS_ID")})
    @JsonBackReference
    private List<Aluno> alunos;

    @OneToMany(mappedBy = "turma", fetch = FetchType.LAZY)
    @JsonBackReference
    private List<Publicacao> publicacoes;

    @OneToMany(mappedBy = "turma", fetch = FetchType.LAZY)
    @JsonBackReference
    private List<Aula> aulas;

}
