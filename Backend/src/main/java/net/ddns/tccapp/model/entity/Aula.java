package net.ddns.tccapp.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@EqualsAndHashCode(exclude = {"respostas"})
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

    @ManyToMany
    private List<Bloco> blocos;

    @Column
    @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm:SS")
    private LocalDateTime dataAula;

    @OneToMany(mappedBy = "aula")
    @JsonBackReference
    private List<Resposta> respostas;

    @PrePersist
    private void prePersist() {
        if(iniciada == null) {
            iniciada = false;
            finalizada = false;
        }
    }

}
