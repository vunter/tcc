package net.ddns.tccapp.controller;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.dto.RespostaDTO;
import net.ddns.tccapp.model.entity.Resposta;
import net.ddns.tccapp.model.service.RespostaService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/resposta")
@RequiredArgsConstructor
public class RespostaController {

    private final RespostaService service;

    @PostMapping
    public Resposta salvar(@RequestBody @Valid RespostaDTO dto) {
        return service.salvar(dto);
    }

    @GetMapping("list/aula/{id}")
    public List<RespostaDTO> listByAulaId(@PathVariable("id") Long idAula) {
        return service.findAllByAulaID(idAula);
    }

}
