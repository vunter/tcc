package net.ddns.tccapp.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.ddns.tccapp.model.enums.RoleEnum;
import net.ddns.tccapp.model.vo.UserVO;
import net.ddns.tccapp.utils.aluno.MatriculaUtils;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public @Data
class Aluno extends Usuario {

    @Column(unique = true)
    @NotBlank
    private String matricula;

    @OneToMany(mappedBy = "aluno", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Avaliacao> avaliacoes;

    @OneToMany(mappedBy = "aluno")
    @JsonIgnore
    private List<Resposta> respostas;

    @ManyToMany(mappedBy = "alunos", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Turma> turmas;

    public Aluno(UserVO usuario) {
        this.setNome(usuario.getNome());
        this.setUser(usuario.getUser());
        this.setPassword(usuario.getPassword());
        this.setEmail(usuario.getEmail());
        this.setRoles(new HashSet<>(Arrays.asList(RoleEnum.ALUNO.toEntity(), RoleEnum.USER.toEntity())));
        this.setMatricula(MatriculaUtils.gerarMatricula());
    }
}
