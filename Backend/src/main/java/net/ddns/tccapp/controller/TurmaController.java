package net.ddns.tccapp.controller;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.entity.Turma;
import net.ddns.tccapp.model.service.TurmaService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/turma")
@RequiredArgsConstructor
public class TurmaController {


    private final TurmaService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Turma salvar(@RequestBody @Valid Turma Turma) {

        return service.salvar(Turma);
    }

    @PostMapping("all")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Turma> saveAll(@RequestBody @Valid List<Turma> turmas) {
        return service.saveAll(turmas);
    }

    @GetMapping("{id}")
    public Turma findOneById(@PathVariable("id") Long id) {
        return service.findOneById(id);
    }

}