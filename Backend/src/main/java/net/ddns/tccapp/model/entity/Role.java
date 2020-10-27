package net.ddns.tccapp.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.ddns.tccapp.model.enums.RoleEnum;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

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

    public RoleEnum toEnum(Role role) {
        return RoleEnum.valueOf(role.getNome());
    }
}
