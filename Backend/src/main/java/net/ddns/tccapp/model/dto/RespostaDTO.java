package net.ddns.tccapp.model.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class RespostaDTO {

    private Long id;

    @NotBlank(message = "{campo.notBlank}")
    private String resposta;

    @NotBlank(message = "{campo.notBlank}")
    private String print;

    @NotNull(message = "{campo.obrigatorio}")
    private Long alunoId;

    @NotNull(message = "{campo.obrigatorio}")
    private Long aulaId;

    private AulaDTO aula;

    private AlunoDTO aluno;


}
