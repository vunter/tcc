package net.ddns.tccapp.model.vo;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.ddns.tccapp.model.entity.Aluno;
import net.ddns.tccapp.model.entity.Professor;
import net.ddns.tccapp.model.entity.Usuario;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
public @Data
class UserVO {

    private Long id;

    @NotBlank(message = "{campo.notBlank}")
    @NotNull(message = "{campo.obrigatorio}")
    private String nome;

    @NotEmpty(message = "{campo.user.obrigatorio}")
    private String user;

    private String password;

    private String role;

    @Email(message = "E-mail inválido!")
    @NotEmpty(message = "{campo.email.obrigatorio}")
    private String email;

    private String matricula;

    private String cpf;

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

        if (usuario instanceof Aluno)
            this.matricula = ((Aluno) usuario).getMatricula();

        if (usuario instanceof Professor)
            this.cpf = ((Professor) usuario).getCpf();

    }
}
