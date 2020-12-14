package net.ddns.tccapp.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.ddns.tccapp.model.entity.Aluno;
import net.ddns.tccapp.model.entity.Professor;
import net.ddns.tccapp.model.entity.Role;
import net.ddns.tccapp.model.entity.Usuario;
import net.minidev.json.annotate.JsonIgnore;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
public @Data class UsuarioDTO {


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

    private String matricula;

    private String cpf;

    public UsuarioDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.user = usuario.getUser();
        this.email = usuario.getEmail();
        this.roles = usuario.getRoles()
                .stream()
                .filter(r -> !r.getId().equals(1L))
                .map(Role::getDescricao)
                .toArray(String[]::new);

        if (usuario instanceof Aluno)
            this.matricula = ((Aluno) usuario).getMatricula();

        if (usuario instanceof Professor)
            this.cpf = ((Professor) usuario).getCpf();
    }

    public void setRoles(String[] roles) {
       this.roles = roles;
    }
}
