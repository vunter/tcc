package net.ddns.tccapp.model.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;

@Entity
public @Data
class Aluno extends Usuario {

    @Column
    @NotBlank
    private String matricula;

}
