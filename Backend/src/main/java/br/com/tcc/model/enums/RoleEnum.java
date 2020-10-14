package br.com.tcc.model.enums;

import br.com.tcc.model.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

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

    public Role toEntity(RoleEnum roleEnum) {
        return Role.builder()
                .id(roleEnum.getId())
                .nome(roleEnum.getNome())
                .descricao(roleEnum.getDescricao())
                .build();
    }


}
