package net.ddns.tccapp.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
public @Data class AvaliacaoDTO {

    private Long id;

    @NotNull(message = "{campo.obrigatorio}")
    private BigDecimal nota;

    private String justificativa;

    @NotNull(message = "{campo.obrigatorio}")
    private Long alunoUserId;

    @NotNull(message = "{campo.obrigatorio}")
    private Long aulaId;

    private AulaDTO aula;

}
