package br.com.tcc.model.entity;

import br.com.tcc.model.annotations.UniqueEmail;
import br.com.tcc.model.annotations.UniqueUser;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
@Inheritance(
        strategy = InheritanceType.JOINED
)
public @Data class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID")
    private Long id;

    @Column
    @NotBlank(message = "{campo.notBlank}")
    @NotNull(message = "{campo.obrigatorio}")
    private String nome;

    @Column(unique = true, nullable = false)
    @UniqueUser
    @NotEmpty(message = "{campo.user.obrigatorio}")
    private String user;

    @Column
    @NotEmpty(message = "{campo.password.obrigatorio}")
    private String password;

    @Column(unique = true)
    @Email(message = "E-mail inválido!")
    @UniqueEmail
    @NotEmpty(message = "{campo.email.obrigatorio}")
    private String email;

    @ManyToMany
    @JoinTable(name = "roles_users",
            joinColumns = @JoinColumn(
                    name = "user_id", referencedColumnName = "USER_ID"),
            inverseJoinColumns = @JoinColumn(
                    name = "role_id", referencedColumnName = "id"))
    private Set<Role> roles;
}
