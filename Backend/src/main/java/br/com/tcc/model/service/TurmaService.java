package br.com.tcc.model.service;

import br.com.tcc.model.entity.Turma;
import br.com.tcc.model.repository.TurmaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TurmaService {

    private final TurmaRepository repository;

    public Turma salvar(Turma turma) {
        return repository.save(turma);
    }

    public List<Turma> saveAll(List<Turma> turmas) {
        return repository.saveAll(turmas);
    }

    public Turma findOneById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Turma com ID " + id + " não encontrada!"));
    }
}
