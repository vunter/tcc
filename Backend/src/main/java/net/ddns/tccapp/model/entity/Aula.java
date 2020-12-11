package net.ddns.tccapp.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@EqualsAndHashCode(exclude = {"avaliacoes"})
public @Data
class Aula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String titulo;

    @Column
    private String objetivo;

    @Column
    @Lob
    private String gabarito;

    @Column
    private Long duracao;

    @ManyToOne
    private Turma turma;

    @Column
    private Integer quantidadeMaxBlocos;

    @Column
    private Boolean iniciada;

    @Column
    private Boolean finalizada;

    @OneToMany
    private List<Bloco> blocos;

    @Column
    @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm:SS")
    private LocalDateTime dataAula;

    @OneToMany(mappedBy = "aula")
    @JsonBackReference
    private List<Avaliacao> avaliacoes;

}
