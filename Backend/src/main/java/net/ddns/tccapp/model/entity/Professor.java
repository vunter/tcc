package net.ddns.tccapp.model.entity;

import lombok.Data;
import org.hibernate.validator.constraints.br.CPF;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public @Data
class Professor extends Usuario {

    @Column(length = 12)
    @CPF
    private String cpf;

}
