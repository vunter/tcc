package net.ddns.tccapp.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.ddns.tccapp.model.enums.RoleEnum;
import net.ddns.tccapp.model.vo.UserVO;
import org.hibernate.validator.constraints.br.CPF;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.util.Arrays;
import java.util.HashSet;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public @Data class Professor extends Usuario {

    @Column(length = 12)
    @CPF
    private String cpf;

    public Professor(UserVO usuario) {
        this.setNome(usuario.getNome());
        this.setUser(usuario.getUser());
        this.setPassword(usuario.getPassword());
        this.setEmail(usuario.getEmail());
        this.setCpf(usuario.getCpf());
        this.setRoles(new HashSet<>(Arrays.asList(RoleEnum.PROF.toEntity(), RoleEnum.USER.toEntity())));
    }
}
