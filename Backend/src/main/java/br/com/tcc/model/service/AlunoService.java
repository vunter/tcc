package br.com.tcc.model.service;

import br.com.tcc.model.entity.Aluno;
import br.com.tcc.model.repository.AlunoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlunoService {

    private final AlunoRepository repository;

    public Aluno salvar(Aluno aluno) {
        return repository.save(aluno);
    }

    public Aluno findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Não foi encontrado nenhum aluno cadastrado com ID " + id));
    }

    public Aluno edit(Aluno aluno) {

        repository.findById(aluno.getId())
                .map(a -> {
                    aluno.setId(a.getId());
                    return salvar(aluno);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ocorreu um erro ao salvar modificações"));

        return null;
    }

    public void deleteAluno(Long id) {
        repository.findById(id)
                .map(a -> {
                    repository.delete(a);
                    return a;
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ocorreu um erro ao deletar aluno"));
    }

    public List<Aluno> listAll() {
        return repository.findAll();
    }
}
