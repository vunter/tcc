package net.ddns.tccapp.controller;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.entity.Aluno;
import net.ddns.tccapp.model.entity.Professor;
import net.ddns.tccapp.model.entity.Usuario;
import net.ddns.tccapp.model.service.AlunoService;
import net.ddns.tccapp.model.service.ProfessorService;
import net.ddns.tccapp.model.service.UsuarioService;
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
    public Usuario salvar(@RequestBody @Valid Usuario usuario) {
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));

        return usuarioService.salvar(usuario);
    }

    @PostMapping("salvar/aluno")
    @ResponseStatus(HttpStatus.CREATED)
    public Aluno salvarAluno(@RequestBody @Valid Aluno aluno) {
        aluno.setPassword(passwordEncoder.encode(aluno.getPassword()));
        return alunoService.salvar(aluno);
    }

    @PostMapping("salvar/professor")
    @ResponseStatus(HttpStatus.CREATED)
    public Professor salvarProfessor(@RequestBody @Valid Professor professor) {
        professor.setPassword(passwordEncoder.encode(professor.getPassword()));
        return professorService.salvar(professor);
    }


}
