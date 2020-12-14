package net.ddns.tccapp.model.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public @Data
class Publicacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonBackReference
    private Usuario autor;

    @Lob
    private String conteudo;

    @Column
    @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm:SS")
    private LocalDateTime data;

    @ManyToOne
    @JsonBackReference
    private Turma turma;

    @OneToMany
    private List<Publicacao> replies;

}
