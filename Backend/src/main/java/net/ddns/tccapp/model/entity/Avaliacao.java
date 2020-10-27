package net.ddns.tccapp.model.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Digits;
import java.math.BigDecimal;

@Entity
public @Data
class Avaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Digits(integer = 3, fraction = 3, message = "Nota deve ter formato, no máximo, 999.999")
    @Column(precision = 6, scale = 3, nullable = false)
    private BigDecimal nota;

    @ManyToOne
    private Aluno aluno;

    @ManyToOne
    private Aula aula;

}
