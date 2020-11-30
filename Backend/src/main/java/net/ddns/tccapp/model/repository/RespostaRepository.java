package net.ddns.tccapp.model.repository;

import net.ddns.tccapp.model.entity.Resposta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RespostaRepository extends JpaRepository<Resposta, Long> {
}
