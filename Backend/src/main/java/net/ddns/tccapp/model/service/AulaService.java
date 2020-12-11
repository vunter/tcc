package net.ddns.tccapp.model.service;


import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.dto.AulaDTO;
import net.ddns.tccapp.model.dto.BlocoDTO;
import net.ddns.tccapp.model.dto.ProfessorDTO;
import net.ddns.tccapp.model.entity.Aula;
import net.ddns.tccapp.model.repository.AulaRepository;
import net.ddns.tccapp.utils.converters.DuracaoConverter;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AulaService {

    private final AulaRepository repository;
    private final ModelMapper modelMapper;

    public AulaDTO findOneById(Long id) {
        return repository.findById(id)
                .map(a -> modelMapper.map(a, AulaDTO.class))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Não encontrada aula com id " + id));
    }

    public List<Aula> findAll() {
        return repository.findAll();
    }

    public List<Aula> findAllByTurma(Long id) {
        return repository.findAllByTurmaId(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Não encontrada aulas para turma com id " + id));
    }

    public Aula salvar(Aula aula) {

        aula.setDuracao(DuracaoConverter.minuteToSeconds(aula.getDuracao()));

        return repository.save(aula);
    }

    public ProfessorDTO findProfessorByAula(Long aulaId) {
        return repository.findProfessorByAula(aulaId).get();
    }

    public List<BlocoDTO> findBlocosByAula(Long idAula) {
        return repository.findBlocosById(idAula).stream()
                .map(b -> modelMapper.map(b, BlocoDTO.class))
                .collect(Collectors.toList());
    }

    public Aula finalizarAula(AulaDTO dto) {

        return repository.findById(dto.getId())
                .map(a -> {
                    dto.setId(a.getId());
                    return repository.save(modelMapper.map(dto, Aula.class));
                }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Erro ao finalizar aula"));

    }

    public Aula iniciarAula(Long idAula) {
        return repository.findById(idAula)
                .map(a -> {
                    a.setIniciada(true);
                    return repository.save(a);
                }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Erro ao iniciar aula"));
    }
}
