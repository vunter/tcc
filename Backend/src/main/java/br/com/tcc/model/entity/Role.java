package br.com.tcc.model.entity;

import br.com.tcc.model.enums.RoleEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Table(name = "TD_ROLE")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public @Data
class Role {

    @Id
    private Long id;

    @Column
    @NotBlank
    private String nome;

    @Column
    @NotBlank
    private String descricao;

    @ManyToMany(mappedBy = "roles")
    private List<Usuario> usuario;

    public RoleEnum toEnum(Role role) {
        return RoleEnum.valueOf(role.getNome());
    }
}
