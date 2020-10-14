package br.com.tcc.controller;

import br.com.tcc.model.entity.Aluno;
import br.com.tcc.model.entity.Professor;
import br.com.tcc.model.entity.Usuario;
import br.com.tcc.model.service.AlunoService;
import br.com.tcc.model.service.ProfessorService;
import br.com.tcc.model.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/cadastro")
@RequiredArgsConstructor
public class CadastroController {

    private final PasswordEncoder passwordEncoder;
    private final UsuarioService usuarioService;
    private final AlunoService alunoService;
    private final ProfessorService professorService;

    @PostMapping("salvar")
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario salvar (@RequestBody @Valid Usuario usuario) {
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));

        return usuarioService.salvar(usuario);
    }

    @PostMapping("salvar/aluno")
    @ResponseStatus(HttpStatus.CREATED)
    public Aluno salvarAluno (@RequestBody @Valid Aluno aluno) {
        aluno.setPassword(passwordEncoder.encode(aluno.getPassword()));
        return alunoService.salvar(aluno);
    }

    @PostMapping("salvar/professor")
    @ResponseStatus(HttpStatus.CREATED)
    public Professor salvarProfessor (@RequestBody @Valid Professor professor) {
        professor.setPassword(passwordEncoder.encode(professor.getPassword()));
        return professorService.salvar(professor);
    }


}
