package net.ddns.tccapp.model.repository;

import net.ddns.tccapp.model.entity.Resposta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RespostaRepository extends JpaRepository<Resposta, Long> {
    List<Resposta> findAllByAulaId(Long idAula);
}
