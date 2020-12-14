package net.ddns.tccapp.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
public @Data
class PublicacaoDTO {
    private Long id;

    @NotBlank(message = "{campo.notBlank}")
    private String conteudo;

    @NotBlank(message = "{campo.notBlank}")
    private UsuarioDTO autor;

    @NotBlank(message = "{campo.notBlank}")
    private Long turmaId;

    private LocalDateTime data;

    private List<PublicacaoDTO> replies;

}
