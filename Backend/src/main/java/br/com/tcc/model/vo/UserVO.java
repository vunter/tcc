package br.com.tcc.model.vo;


import br.com.tcc.model.entity.Aluno;
import br.com.tcc.model.entity.Usuario;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
public @Data class UserVO {

    private Long id;

    @NotBlank(message = "{campo.notBlank}")
    @NotNull(message = "{campo.obrigatorio}")
    private String nome;

    @NotEmpty(message = "{campo.user.obrigatorio}")
    private String user;

    @NotBlank(message = "Role não pode estar em branco")
    private String role;

    @Email(message = "E-mail inválido!")
    @NotEmpty(message = "{campo.email.obrigatorio}")
    private String email;

    private String matricula;

    public UserVO(Usuario usuario) {
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.user = usuario.getUser();
        this.email = usuario.getEmail();
        this.role = usuario.getRoles()
                .stream().filter(r -> !r.getId().equals(1L))
                .findFirst()
                .orElseThrow()
                .getDescricao();
        if (usuario instanceof Aluno) {
            this.matricula = ((Aluno) usuario).getMatricula();
        }

    }
}
