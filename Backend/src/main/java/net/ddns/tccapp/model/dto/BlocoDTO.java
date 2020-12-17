package net.ddns.tccapp.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@NoArgsConstructor
@AllArgsConstructor
public @Data class BlocoDTO {
    private Long id;

    @NotBlank(message = "{campo.notBlank}")
    private String conteudo;

    @NotBlank(message = "{campo.notBlank}")
    private String titulo;

    private Long professorId;

}
