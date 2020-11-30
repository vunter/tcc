package net.ddns.tccapp.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.ddns.tccapp.utils.converters.SqlTimeDeserializer;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.sql.Time;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
public @Data class AulaDTO {

    private Long id;

    @NotNull(message = "{campo.obrigatorio}")
    private LocalDateTime dataAula;

    @NotNull(message = "{campo.obrigatorio}")
    @JsonFormat(pattern = "HH:mm")
    @JsonDeserialize(using = SqlTimeDeserializer.class)
    private Time duracao;

    @NotBlank(message = "{campo.notBlank}")
    private String gabarito;

    @NotBlank(message = "{campo.notBlank}")
    private String objetivo;

    @NotBlank(message = "{campo.notBlank}")
    private String titulo;

    @NotNull(message = "{campo.obrigatorio}")
    private Long turmaId;

    private Integer quantidadeMaxBlocos;


}
