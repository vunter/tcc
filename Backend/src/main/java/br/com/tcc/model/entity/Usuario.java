package br.com.tcc.model.entity;

import br.com.tcc.model.enums.RoleEnum;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.Set;

@Entity
@Inheritance(
        strategy = InheritanceType.JOINED
)
public abstract @Data
class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nome;

    @Column(unique = true, nullable = false)
    private String user;

    @Column
    private String senha;

    @Email
    private String email;

    @ManyToMany
    @JoinTable(name = "roles_users",
            joinColumns = @JoinColumn(
                    name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "role_id", referencedColumnName = "id"))
    private Set<Role> roles;
}
