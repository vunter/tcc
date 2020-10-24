package br.com.tcc.controller;

import br.com.tcc.model.entity.Aluno;
import br.com.tcc.model.service.AlunoService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/aluno")
@RequiredArgsConstructor
public class AlunoController {

    private final AlunoService alunoService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("salvar")
    public Aluno salvar(@RequestBody @Valid Aluno aluno) {

        aluno.setPassword(passwordEncoder.encode(aluno.getPassword()));

        return alunoService.salvar(aluno);
    }

    @GetMapping("{id}")
    public Aluno findById(@PathVariable("id") Long id) {
        return alunoService.findById(id);
    }


    @PutMapping("edit")
    public Aluno edit(@RequestBody @Valid Aluno aluno) {
        return alunoService.edit(aluno);
    }
}
