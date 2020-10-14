package br.com.tcc.model.service;

import br.com.tcc.model.entity.Aluno;
import br.com.tcc.model.entity.Professor;
import br.com.tcc.model.repository.ProfessorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfessorService {

    private final ProfessorRepository repository;

    public Professor salvar(Professor professor) {

        return repository.save(professor);
    }
}
