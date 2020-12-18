package net.ddns.tccapp.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import net.ddns.tccapp.model.entity.Role;

@Getter
@AllArgsConstructor
public enum RoleEnum {

    USER(1L, "Usuario", "Usuário Comum"),
    ADMIN(2L, "Administrador", "Administrador"),
    PROF(3L, "Professor", "Professor"),
    ALUNO(4L, "Aluno", "Aluno");


    private final Long id;
    private final String nome;
    private final String descricao;

    public Role toEntity() {
        return Role.builder()
                .id(this.getId())
                .nome(this.getNome())
                .descricao(this.getDescricao())
                .build();
    }


}
