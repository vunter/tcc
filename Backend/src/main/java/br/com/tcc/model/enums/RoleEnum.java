package br.com.tcc.model.enums;

import br.com.tcc.model.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
public enum RoleEnum {

    USER(1L,"USER","Usuário Comum"),
    ADMIN(2L, "ADMIN", "Administrador"),
    PROF(3L, "PROFESSOR", "Professor"),
    ALUNO(4L, "ALUNO", "Aluno");


    private Long id;
    private String nome;
    private String descricao;

    public Role toEntity(RoleEnum roleEnum) {
        return Role.builder()
                .id(roleEnum.getId())
                .nome(roleEnum.getNome())
                .descricao(roleEnum.getDescricao())
                .build();
    }


}
