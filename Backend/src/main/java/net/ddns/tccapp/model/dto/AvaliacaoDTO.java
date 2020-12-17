package net.ddns.tccapp.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
public @Data class AvaliacaoDTO {

    private Long id;

    @NotBlank(message = "{campo.notBlank}")
    private BigDecimal nota;

    private String justificativa;

    @NotBlank(message = "{campo.notBlank}")
    private Long alunoUserId;

    @NotBlank(message = "{campo.notBlank}")
    private Long aulaId;

}
