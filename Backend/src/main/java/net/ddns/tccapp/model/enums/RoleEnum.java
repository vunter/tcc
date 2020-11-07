package net.ddns.tccapp.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import net.ddns.tccapp.model.entity.Role;

@Getter
@AllArgsConstructor
public enum RoleEnum {

    USER(1L, "USER", "Usuário Comum"),
    ADMIN(2L, "ADMIN", "Administrador"),
    PROF(3L, "PROFESSOR", "Professor"),
    ALUNO(4L, "ALUNO", "Aluno");


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
