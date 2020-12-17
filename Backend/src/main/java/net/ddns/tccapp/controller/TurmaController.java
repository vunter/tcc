package net.ddns.tccapp.controller;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.dto.AlunoDTO;
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
    public TurmaDTO salvar(@RequestBody @Valid TurmaDTO dto) {

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

    @GetMapping("list/aluno/{id}")
    @ResponseBody
    public List<TurmaDTO> listTurmasByAlunoId(@PathVariable("id") Long idUser) {
        return service.listTurmasByAlunoId(idUser);
    }

    @GetMapping("list/professor/{id}")
    @ResponseBody
    public List<TurmaDTO> listTurmasByProfessorId(@PathVariable("id") Long idUser) {
        return service.listTurmasByProfessorId(idUser);
    }

    @PutMapping("entrar")
    @ResponseStatus(HttpStatus.CREATED)
    public TurmaDTO entrarTurma(@RequestParam("codTurma") String codTurma, @RequestBody @Valid AlunoDTO dto) {

        return service.entrarEmTurma(codTurma, dto);
    }

}
