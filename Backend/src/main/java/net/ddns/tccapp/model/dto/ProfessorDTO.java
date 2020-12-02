package net.ddns.tccapp.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@NoArgsConstructor
@AllArgsConstructor
public @Data class ProfessorDTO {

    private Long id;

    @NotBlank(message = "{campo.notBlank}")
    @NotNull(message = "{campo.obrigatorio}")
    private String nome;

    @NotEmpty(message = "{campo.user.obrigatorio}")
    private String user;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String[] roles;

    @Email(message = "E-mail inválido!")
    @NotEmpty(message = "{campo.email.obrigatorio}")
    private String email;

    private String cpf;

    public ProfessorDTO(Long id, String nome, String user, String password, String email, String cpf) {
        this.id = id;
        this.nome = nome;
        this.user = user;
        this.password = password;
        this.email = email;
        this.cpf = cpf;
    }
}
