package br.com.tcc.model.repository;

import br.com.tcc.model.entity.Aula;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AulaRepository extends JpaRepository<Aula, Long> {
    Optional<List<Aula>> findAllByTurmaId(Long id);
}
