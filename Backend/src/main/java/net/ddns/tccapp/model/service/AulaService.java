package net.ddns.tccapp.model.service;


import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.entity.Aula;
import net.ddns.tccapp.model.repository.AulaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AulaService {

    private final AulaRepository repository;

    public Aula findOneById(Long id) {
        return repository.findById(id)
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
        return repository.save(aula);
    }

}
