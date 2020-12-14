package net.ddns.tccapp.model.repository;

import net.ddns.tccapp.model.dto.AulaDTO;
import net.ddns.tccapp.model.dto.BlocoDTO;
import net.ddns.tccapp.model.dto.ProfessorDTO;
import net.ddns.tccapp.model.entity.Aula;
import net.ddns.tccapp.model.entity.Bloco;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AulaRepository extends JpaRepository<Aula, Long> {
    Optional<List<Aula>> findAllByTurmaId(Long id);

    @Query("SELECT new net.ddns.tccapp.model.dto.ProfessorDTO(p.id, p.nome, p.user, p.password, p.email, p.cpf) FROM Professor p " +
            "JOIN Turma t ON t.professor.id = p.id " +
            "JOIN Aula a ON a.turma.id = t.id " +
            "WHERE a.id = ?1")
    Optional<ProfessorDTO> findProfessorByAula(Long aulaId);

    @Query("SELECT a.blocos FROM Aula a WHERE a.id = ?1")
    List<Bloco> findBlocosById(Long idAula);

    Optional<Aula> findByTurmaIdAndIniciadaTrueAndFinalizadaFalse(Long idTurma);
}
