package net.ddns.tccapp.model.repository;

import net.ddns.tccapp.model.dto.AvaliacaoDTO;
import net.ddns.tccapp.model.entity.Avaliacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {
    List<Avaliacao> findAllByAlunoId(Long idAluno);
}
