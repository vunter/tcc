package net.ddns.tccapp.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
public @Data
class AulaDTO {

    private Long id;

    @NotNull(message = "{campo.obrigatorio}")
    private LocalDateTime dataAula;

    @NotNull(message = "{campo.obrigatorio}")
    private Long duracao;

    private String gabarito;

    @NotBlank(message = "{campo.notBlank}")
    private String objetivo;

    @NotBlank(message = "{campo.notBlank}")
    private String titulo;

    @NotNull(message = "{campo.obrigatorio}")
    private Long turmaId;

    private Integer quantidadeMaxBlocos;

    private Boolean iniciada;

    private Boolean finalizada;

    private String nomeProfessor;

    private TurmaDTO turma;

    private List<BlocoDTO> blocos;


}
