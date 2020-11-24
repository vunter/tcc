package net.ddns.tccapp.model.repository;

import net.ddns.tccapp.model.entity.Bloco;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BlocoRepository extends JpaRepository<Bloco, Long> {
    Optional<List<Bloco>> findAllByProfessorCriadorId(Long professorId);
}
