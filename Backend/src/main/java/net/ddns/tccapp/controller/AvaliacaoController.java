package net.ddns.tccapp.controller;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.dto.AvaliacaoDTO;
import net.ddns.tccapp.model.entity.Avaliacao;
import net.ddns.tccapp.model.service.AvaliacaoService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/avaliacao")
@RequiredArgsConstructor
public class AvaliacaoController {

    private final AvaliacaoService service;

    @PostMapping("salvar")
    public Avaliacao salvar(@RequestBody @Valid AvaliacaoDTO dto) {
        return service.salvar(dto);
    }



}
