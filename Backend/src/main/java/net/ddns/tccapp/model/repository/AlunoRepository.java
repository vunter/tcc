package net.ddns.tccapp.model.repository;

import net.ddns.tccapp.model.entity.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Long> {

    Optional<Aluno> findByMatricula(String matricula);

    Optional<List<Aluno>> findAllByTurmasId(Long turmaId);
}
