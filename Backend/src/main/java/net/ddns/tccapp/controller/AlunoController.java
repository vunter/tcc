package net.ddns.tccapp.controller;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.dto.AlunoDTO;
import net.ddns.tccapp.model.entity.Aluno;
import net.ddns.tccapp.model.service.AlunoService;
import org.modelmapper.ModelMapper;
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
    private final ModelMapper modelMapper;

    @PostMapping("salvar")
    public Aluno salvar(@RequestBody @Valid AlunoDTO aluno) {

        aluno.setPassword(passwordEncoder.encode(aluno.getPassword()));

        return alunoService.salvar(modelMapper.map(aluno, Aluno.class));
    }

    @GetMapping("{id}")
    public AlunoDTO findById(@PathVariable("id") Long id) {
        return alunoService.findById(id);
    }


    @PutMapping("edit")
    public Aluno edit(@RequestBody @Valid AlunoDTO aluno) {
        return alunoService.edit(aluno);
    }

    @GetMapping("list/turma/{id}")
    public List<AlunoDTO> listByTurma(@PathVariable("id") Long turmaId) {
        return alunoService.findAllByTurmaId(turmaId);
    }

}
