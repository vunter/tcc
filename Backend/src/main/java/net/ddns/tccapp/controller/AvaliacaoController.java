package net.ddns.tccapp.controller;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.dto.AvaliacaoDTO;
import net.ddns.tccapp.model.entity.Avaliacao;
import net.ddns.tccapp.model.service.AvaliacaoService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/avaliacao")
@RequiredArgsConstructor
public class AvaliacaoController {

    private final AvaliacaoService service;

    @PostMapping("salvar")
    public Avaliacao salvar(@RequestBody @Valid AvaliacaoDTO dto) {
        return service.salvar(dto);
    }

    @GetMapping("aluno/{id}")
    public List<AvaliacaoDTO> listByAluno(@PathVariable("id") Long idAluno) {
        return service.findAllByAluno(idAluno);
    }

}
