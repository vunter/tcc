package net.ddns.tccapp.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@NoArgsConstructor
@AllArgsConstructor
public @Data class TurmaDTO {

    private Long id;

    private int capacidade;

    private String codigo;

    @NotBlank(message = "{campo.notBlank}")
    private String titulo;

    @NotBlank(message = "{campo.notBlank}")
    private String descricao;

    @NotNull(message = "{campo.notBlank}")
    private boolean publico;

    @NotNull(message = "{campo.notBlank}")
    private Long professorUserId;

    private String nomeProfessor;


}
