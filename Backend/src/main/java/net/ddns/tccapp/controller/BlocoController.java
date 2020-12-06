package net.ddns.tccapp.controller;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.dto.BlocoDTO;
import net.ddns.tccapp.model.entity.Bloco;
import net.ddns.tccapp.model.service.BlocoService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/bloco")
@RequiredArgsConstructor
public class BlocoController {

    private final BlocoService service;

    @PostMapping("salvar")
    public Bloco save(@RequestBody @Valid BlocoDTO dto) {
        return service.salvar(dto);
    }

    @GetMapping("list/professor/{id}")
    public List<BlocoDTO> listBlocosByProfessor(@PathVariable("id") Long idProfessor) {
        return service.findAllByProfessorId(idProfessor);
    }

    @GetMapping("list/aula/{id}")
    public List<BlocoDTO> listBlocosByAula(@PathVariable("id") Long idAula) {
        return service.findAllByAulaId(idAula);
    }

}
