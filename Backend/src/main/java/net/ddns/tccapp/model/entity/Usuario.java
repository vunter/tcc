package net.ddns.tccapp.model.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import net.ddns.tccapp.model.annotations.UniqueEmail;
import net.ddns.tccapp.model.annotations.UniqueUser;
import net.minidev.json.annotate.JsonIgnore;

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
public @Data
class Usuario {

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
    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Column(unique = true)
    @Email(message = "E-mail inválido!")
    @UniqueEmail
    @NotEmpty(message = "{campo.email.obrigatorio}")
    private String email;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "roles_users",
            joinColumns = @JoinColumn(
                    name = "user_id", referencedColumnName = "USER_ID"),
            inverseJoinColumns = @JoinColumn(
                    name = "role_id", referencedColumnName = "id"))
    private Set<Role> roles;
}
