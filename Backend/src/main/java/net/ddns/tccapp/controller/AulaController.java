package net.ddns.tccapp.controller;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.dto.AulaDTO;
import net.ddns.tccapp.model.dto.ProfessorDTO;
import net.ddns.tccapp.model.entity.Aula;
import net.ddns.tccapp.model.service.AulaService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/aula")
@RequiredArgsConstructor
public class AulaController {

    private final AulaService service;
    private final ModelMapper modelMapper;

    @GetMapping("{id}")
    public AulaDTO buscaAula(@PathVariable("id") Long id) {
        return service.findOneById(id);
    }

    @GetMapping("turma/{id}")
    public List<Aula> listaAulaPorTurmaid(@PathVariable("id") Long id) {

        return service.findAllByTurma(id);
    }

    @GetMapping("aluno/{id}")
    public List<AulaDTO> listaAulaPorAlunoid(@PathVariable("id") Long id) {
        return service.findNext5ByAlunoId(id);
    }

    @GetMapping("iniciada/aluno/{id}")
    public List<AulaDTO> listarAulasAoVivoPorAlunoId(@PathVariable("id") Long id) {
        return service.listarAulasAoVivoPorAlunoId(id);
    }


    @PostMapping("salvar")
    public Aula save(@RequestBody @Valid AulaDTO dto) {
        return service.salvar(modelMapper.map(dto, Aula.class));
    }


    @GetMapping("professor/{id}")
    public ProfessorDTO getProfessorAula(@PathVariable("id") Long aulaId) {
        return service.findProfessorByAula(aulaId);
    }

    @PutMapping("finalizar")
    public Aula finalizarAula(@RequestBody @Valid AulaDTO dto) {
        return service.finalizarAula(dto);
    }

    @PutMapping("iniciar")
    public Aula iniciarAula(@RequestBody Long idAula) {
        return service.iniciarAula(idAula);
    }

}
