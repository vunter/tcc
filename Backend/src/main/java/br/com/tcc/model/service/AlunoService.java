package br.com.tcc.model.service;

import br.com.tcc.model.entity.Aluno;
import br.com.tcc.model.repository.AlunoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AlunoService {

    private final AlunoRepository repository;

    public Aluno salvar(Aluno aluno) {
        return repository.save(aluno);
    }
}
