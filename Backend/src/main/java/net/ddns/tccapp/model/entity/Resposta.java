package net.ddns.tccapp.model.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Resposta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private String resposta;

    @Lob
    private String print;

    @OneToOne
    private Aluno aluno;

    @OneToOne
    private Aula aula;

}
