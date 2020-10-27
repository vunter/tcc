package net.ddns.tccapp.model.entity;


import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
public @Data
class Publicacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Usuario autor;

    @Lob
    private String conteudo;

    @ManyToOne
    private Turma turma;

    @OneToMany
    private List<Publicacao> replies;

}
