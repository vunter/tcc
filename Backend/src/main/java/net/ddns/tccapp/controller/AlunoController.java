package net.ddns.tccapp.controller;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.entity.Aluno;
import net.ddns.tccapp.model.service.AlunoService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

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
