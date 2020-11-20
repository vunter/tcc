package net.ddns.tccapp.model.repository;

import net.ddns.tccapp.model.dto.TurmaDTO;
import net.ddns.tccapp.model.entity.Turma;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TurmaRepository extends JpaRepository<Turma, Long> {
    Optional<Turma> findByCodigo(String codigo);

    Optional<List<Turma>> findAllByPublico(Boolean publico);
}
