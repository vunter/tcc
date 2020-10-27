package net.ddns.tccapp.controller;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.entity.Aula;
import net.ddns.tccapp.model.service.AulaService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/aula")
@RequiredArgsConstructor
public class AulaController {

    private final AulaService service;

    @GetMapping("{id}")
    public Aula buscaAula(@PathVariable("id") Long id) {
        return service.findOneById(id);
    }

    @GetMapping("turma/{id}")
    public List<Aula> listaAulaPorTurmaid(@PathVariable("id") Long id) {

        return service.findAllByTurma(id);
    }

}
