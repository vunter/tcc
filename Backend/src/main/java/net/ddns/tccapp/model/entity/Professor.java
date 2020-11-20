package net.ddns.tccapp.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import net.ddns.tccapp.model.enums.RoleEnum;
import net.ddns.tccapp.model.vo.UserVO;
import org.hibernate.validator.constraints.br.CPF;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(exclude = {"turmas", "blocos"}, callSuper = false)
public @Data
class Professor extends Usuario {

    @Column(length = 12)
    @CPF
    private String cpf;

    @OneToMany(mappedBy = "professor", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Turma> turmas;

    @OneToMany(mappedBy = "professorCriador", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Bloco> blocos;

    public Professor(UserVO usuario) {
        this.setNome(usuario.getNome());
        this.setUser(usuario.getUser());
        this.setPassword(usuario.getPassword());
        this.setEmail(usuario.getEmail());
        this.setCpf(usuario.getCpf());
        this.setRoles(new HashSet<>(Arrays.asList(RoleEnum.PROF.toEntity(), RoleEnum.USER.toEntity())));
    }
}
