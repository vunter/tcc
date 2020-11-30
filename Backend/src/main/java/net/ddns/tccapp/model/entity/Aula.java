package net.ddns.tccapp.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.ddns.tccapp.utils.converters.SqlTimeDeserializer;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.sql.Time;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@EqualsAndHashCode(exclude = {"avaliacoes"})
public @Data class Aula {

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

    @JsonFormat(pattern = "HH:mm")
    @JsonDeserialize(using = SqlTimeDeserializer.class)
    @Column
    private Time duracao;

    @ManyToOne
    private Turma turma;

    @Column
    private Integer quantidadeMaxBlocos;

    @OneToMany
    private List<Bloco> blocos;

    @Column
    @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm:SS")
    private LocalDateTime dataAula;

    @OneToMany(mappedBy = "aula")
    @JsonBackReference
    private List<Avaliacao> avaliacoes;

}
