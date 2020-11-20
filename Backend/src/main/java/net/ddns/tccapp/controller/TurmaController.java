package net.ddns.tccapp.controller;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.dto.PublicacaoDTO;
import net.ddns.tccapp.model.dto.TurmaDTO;
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
    public Turma salvar(@RequestBody @Valid TurmaDTO dto) {

        return service.salvar(dto);
    }

    @GetMapping("{id}")
    public TurmaDTO findOneById(@PathVariable("id") Long id) {
        return service.findOneById(id);
    }

    @GetMapping("list/publicacoes")
    @ResponseBody
    public List<PublicacaoDTO> listPublicacoesByTurma(@RequestParam("idTurma") Long idTurma) {
        return service.listPublicacoesTurma(idTurma);
    }

}
