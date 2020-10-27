package net.ddns.tccapp.model.service;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.entity.Professor;
import net.ddns.tccapp.model.repository.ProfessorRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfessorService {

    private final ProfessorRepository repository;

    public Professor salvar(Professor professor) {

        return repository.save(professor);
    }
}
